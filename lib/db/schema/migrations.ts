import type { SQLiteDatabase } from "expo-sqlite";
import initialSql from "@/lib/db/schema/0001_initial";

const MIGRATIONS: { id: string; sql: string }[] = [
  { id: "0001_initial", sql: initialSql ?? "" },
  // { id: '0002_add_whatever', sql: 'ALTER TABLE ...' },
];

export async function migrateAsync(db: SQLiteDatabase) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS meta_migrations (
      id TEXT PRIMARY KEY,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  const applied = new Set<string>();
  const rows = await db.getAllAsync<{ id: string }>(`SELECT id FROM meta_migrations`);

  for (const r of rows) {
    applied.add(r.id);
  }

  for (const m of MIGRATIONS) {
    if (applied.has(m.id)) continue;
    await db.withTransactionAsync(async () => {
      await db.execAsync(m.sql);
      await db.runAsync(`INSERT INTO meta_migrations(id) VALUES (?);`, [m.id]);
    });
  }
}
