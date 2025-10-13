export const SELECT_ALL_QUESTIONS = `
  SELECT * FROM questions
  ORDER BY created_at DESC;
`;

export const SELECT_RANDOM_QUESTIONS = `
  SELECT * FROM questions
  ORDER BY RANDOM()
  LIMIT ?;
`;

export const SELECT_QUESTION_BY_ID = `
  SELECT * FROM questions WHERE id = ?;
`;

export const INSERT_QUESTION = `
  INSERT INTO questions (title, body, created_at)
  VALUES (?, ?, ?);
`;

export const UPDATE_QUESTION = `
  UPDATE questions SET title = ?, body = ?
  WHERE id = ?;
`;

export const DELETE_QUESTION = `
  DELETE FROM questions WHERE id = ?;
`;

export const COUNT_QUESTIONS = `
  SELECT COUNT(*) AS count FROM questions;
`;
