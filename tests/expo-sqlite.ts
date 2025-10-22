/** ---- Types -------------------------------------------------------------- */

export type Row = Record<string, unknown>;

type Table = {
  autoId: number;
  rows: Row[];
};

export interface SQLResultSet {
  rows: {
    length: number;
    item: (i: number) => Row;
  };
  rowsAffected: number;
  insertId?: number;
}

export interface Transaction {
  executeSql: ExecuteSql;
}

export type ExecuteSql = (
  sql: string,
  params?: unknown[],
  onSuccess?: (tx: Transaction, rs: SQLResultSet) => void,
  onError?: (tx: Transaction, err: unknown) => void,
) => void;

/** ---- In-memory Store ---------------------------------------------------- */

const DB: Record<string, Table> = {};

export const __resetMockSQLite = (): void => {
  Object.keys(DB).forEach((k) => {
    delete DB[k];
  });
};

function ensureTable(name: string): void {
  if (!DB[name]) {
    DB[name] = { autoId: 1, rows: [] };
  }
}

/** ---- Helpers ------------------------------------------------------------ */

function toResult(rows: Row[], rowsAffected = 0, insertId?: number): SQLResultSet {
  return {
    rows: {
      length: rows.length,
      item: (i: number) => rows[i],
    },
    rowsAffected,
    insertId,
  };
}

function normalizeSQL(sql: string): string {
  return sql.trim().replace(/\s+/g, " ").toUpperCase();
}

/** ---- Minimal SQL Engine ------------------------------------------------- */
/**
 * よく使うクエリ形だけをカバーしています
 * 必要になったら分岐を追加
 */
function runSql(sqlRaw: string, params: unknown[] = []): SQLResultSet {
  const sql = sqlRaw.trim();
  const U = normalizeSQL(sql);

  // CREATE TABLE ... → 成功扱い
  if (U.startsWith("CREATE TABLE")) {
    return toResult([]);
  }

  // INSERT INTO <table> (c1,c2,...) VALUES (?, ?, ...)
  {
    const m = /INSERT\s+INTO\s+([A-Z0-9_]+)\s*\((.+?)\)\s*VALUES\s*\((.+?)\)/i.exec(sql);
    if (m) {
      const table = m[1];
      const cols = m[2].split(",").map((s) => s.trim().replace(/[`"'[\]]/g, ""));

      ensureTable(table);
      const t = DB[table];

      const row: Row = {};
      cols.forEach((c, i) => {
        row[c] = params[i];
      });

      if (!("id" in row)) {
        row.id = t.autoId++;
      }
      t.rows.push(row);

      return toResult([], 1, row.id as number | undefined);
    }
  }

  // SELECT * FROM <table> WHERE id = ?
  {
    const m = /SELECT\s+\*\s+FROM\s+([A-Z0-9_]+)\s+WHERE\s+ID\s*=\s*\?/i.exec(U);
    if (m) {
      const table = m[1];
      ensureTable(table);
      const id = params[0];
      const rows = DB[table].rows.filter((r) => r.id === id);
      return toResult(rows);
    }
  }

  // SELECT * FROM <table> [WHERE ...] [ORDER BY ...] [LIMIT ?]
  {
    const m = /SELECT\s+\*\s+FROM\s+([A-Z0-9_]+)/i.exec(U);
    if (m) {
      const table = m[1];
      ensureTable(table);
      let rows = [...DB[table].rows];

      // WHERE dueAt <= ?
      if (/WHERE\s+DUEAT\s*<=\s*\?/i.test(U)) {
        const cutoff = params[0] as number;
        rows = rows.filter((r) => {
          const v = (r.dueAt as number | undefined) ?? Number.POSITIVE_INFINITY;
          return v <= cutoff;
        });
      }

      // WHERE <col> = ?
      const whereEq = /WHERE\s+([A-Z0-9_]+)\s*=\s*\?/i.exec(U);
      if (whereEq) {
        const col = whereEq[1];
        const val = params[0];
        rows = rows.filter((r) => r[col] === val);
      }

      // ORDER BY <col> ASC|DESC
      const orderBy = /ORDER BY\s+([A-Z0-9_]+)\s+(ASC|DESC)/i.exec(U);
      if (orderBy) {
        const col = orderBy[1];
        const dir = orderBy[2].toUpperCase();
        rows.sort((a, b) => {
          const av = (a[col] as number | undefined) ?? 0;
          const bv = (b[col] as number | undefined) ?? 0;
          return dir === "ASC" ? av - bv : bv - av;
        });
      }

      // LIMIT ?
      if (/LIMIT\s+\?/i.test(U)) {
        const limitParamIndex = params.length - 1;
        const limit = params[limitParamIndex] as number;
        rows = rows.slice(0, limit);
      }

      return toResult(rows);
    }
  }

  // UPDATE <table> SET c1=?, c2=? WHERE id = ?
  {
    const m = /UPDATE\s+([A-Z0-9_]+)\s+SET\s+(.+?)\s+WHERE\s+ID\s*=\s*\?/i.exec(U);
    if (m) {
      const table = m[1];
      const setClause = m[2]; // "c1=?, c2=?"
      ensureTable(table);

      const cols = setClause.split(",").map((s) =>
        s
          .split("=")[0]
          .trim()
          .replace(/[`"'[\]]/g, ""),
      );

      const id = params[params.length - 1];
      let affected = 0;

      DB[table].rows = DB[table].rows.map((row) => {
        if (row.id === id) {
          const next: Row = { ...row };
          cols.forEach((c, i) => {
            next[c] = params[i];
          });
          affected += 1;
          return next;
        }
        return row;
      });

      return toResult([], affected);
    }
  }

  // DELETE FROM <table> WHERE id = ?
  {
    const m = /DELETE\s+FROM\s+([A-Z0-9_]+)\s+WHERE\s+ID\s*=\s*\?/i.exec(U);
    if (m) {
      const table = m[1];
      ensureTable(table);
      const id = params[0];

      const before = DB[table].rows.length;
      DB[table].rows = DB[table].rows.filter((r) => r.id !== id);
      const after = DB[table].rows.length;

      return toResult([], before - after);
    }
  }

  // 未対応クエリ → 成功扱い（空）
  return toResult([]);
}

/** ---- Public API --------------------------------------------------------- */

export function openDatabase(_name?: string) {
  const txImpl: Transaction = {
    executeSql: (
      sql: string,
      params: unknown[] = [],
      onSuccess?: (tx: Transaction, rs: SQLResultSet) => void,
      onError?: (tx: Transaction, err: unknown) => void,
    ): void => {
      try {
        const res = runSql(sql, params);
        if (onSuccess) onSuccess(txImpl, res);
      } catch (e) {
        if (onError) onError(txImpl, e);
      }
    },
  };

  return {
    transaction: (
      cb: (tx: Transaction) => void,
      errorCb?: (err: unknown) => void,
      successCb?: () => void,
    ): void => {
      try {
        cb(txImpl);
        if (successCb) successCb();
      } catch (e) {
        if (errorCb) errorCb(e);
      }
    },

    readTransaction: (
      cb: (tx: Transaction) => void,
      errorCb?: (err: unknown) => void,
      successCb?: () => void,
    ): void => {
      // 簡易実装：同じでOK
      try {
        cb(txImpl);
        if (successCb) successCb();
      } catch (e) {
        if (errorCb) errorCb(e);
      }
    },
  };
}

export default { openDatabase };
