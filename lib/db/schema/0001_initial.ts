const initialSql = `
CREATE TABLE IF NOT EXISTS questions (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  prompt        TEXT    NOT NULL,
  answer        TEXT    NOT NULL,
  ease_factor   REAL    NOT NULL DEFAULT 2.5 CHECK (ease_factor >= 1.3),
  interval_days INTEGER NOT NULL DEFAULT 0   CHECK (interval_days >= 0),
  due_at        TEXT,
  created_at    TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at    TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS review_logs (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  question_id INTEGER NOT NULL,
  rating      INTEGER NOT NULL CHECK (rating BETWEEN 0 AND 5),
  reviewed_at TEXT    NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_questions_due_at ON questions(due_at);
CREATE INDEX IF NOT EXISTS idx_review_logs_qid  ON review_logs(question_id);
`;
export default initialSql;
