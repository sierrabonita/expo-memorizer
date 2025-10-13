export const SCHEMA_V1 = `
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS meta (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  body TEXT,
  created_at INTEGER NOT NULL
);
`;

export const SELECT_SCHEMA_VERSION = `
  SELECT value AS version FROM meta WHERE key = 'schema_version' LIMIT 1;
`;

export const INSERT_SCHEMA_VERSION = `
  INSERT INTO meta (key, value) VALUES ('schema_version', ?);
`;

export const UPDATE_SCHEMA_VERSION = `
  UPDATE meta SET value = ? WHERE key = 'schema_version';
`;
