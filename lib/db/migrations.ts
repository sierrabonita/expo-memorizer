import {
  INSERT_SCHEMA_VERSION,
  SCHEMA_V1,
  SELECT_SCHEMA_VERSION,
  UPDATE_SCHEMA_VERSION,
} from "./sql/schema.sql";
import { db } from "./sqlite";

/**
 * スキーマバージョンを取得（無ければ null）
 */
function getSchemaVersion(): number | null {
  try {
    const row = db.getFirstSync<{ version: string }>(SELECT_SCHEMA_VERSION);
    return row ? Number(row.version) : null;
  } catch {
    return null;
  }
}

function setSchemaVersion(v: number) {
  const existing = getSchemaVersion();
  if (existing === null) {
    db.runSync(INSERT_SCHEMA_VERSION, [String(v)]);
  } else {
    db.runSync(UPDATE_SCHEMA_VERSION, [String(v)]);
  }
}

/**
 * 同期マイグレーション
 * v0 → v1: 初回スキーマを作成
 * 将来的に switch/case で v1→v2… の ALTER を積み上げる
 */
export function ensureMigrationsSync() {
  db.withTransactionSync(() => {
    const version = getSchemaVersion();

    if (version === null) {
      // 初回：テーブル群を作成
      db.execSync(SCHEMA_V1);
      setSchemaVersion(1);
      return;
    }

    if (version < 2) {
      db.execSync(`ALTER TABLE questions ADD COLUMN something TEXT;`);
      setSchemaVersion(2);
    }
  });
}
