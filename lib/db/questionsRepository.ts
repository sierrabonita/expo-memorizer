import {
  COUNT_QUESTIONS,
  DELETE_QUESTION,
  INSERT_QUESTION,
  SELECT_ALL_QUESTIONS,
  SELECT_QUESTION_BY_ID,
  SELECT_RANDOM_QUESTIONS,
  UPDATE_QUESTION,
} from "./sql/questions.sql";
import { db } from "./sqlite";

export type Question = {
  id: number;
  title: string;
  body: string | null;
  created_at: number;
};

export function getAllQuestions(): Question[] {
  return db.getAllSync<Question>(SELECT_ALL_QUESTIONS);
}

export function getRandomQuestions(limit = 5): Question[] {
  return db.getAllSync<Question>(SELECT_RANDOM_QUESTIONS, [limit]);
}

export function getQuestionById(id: number): Question | null {
  return db.getFirstSync<Question>(SELECT_QUESTION_BY_ID, [id]) ?? null;
}

export function insertQuestion(title: string, body: string) {
  const now = Date.now();
  db.runSync(INSERT_QUESTION, [title, body, now]);
}

export function updateQuestion(id: number, title: string, body: string) {
  db.runSync(UPDATE_QUESTION, [title, body, id]);
}

export function deleteQuestion(id: number) {
  db.runSync(DELETE_QUESTION, [id]);
}

export function countQuestions(): number {
  const row = db.getFirstSync<{ count: number }>(COUNT_QUESTIONS);
  return row?.count ?? 0;
}

/** 初回だけダミーデータ投入 */
export function seedQuestionsIfEmptySync() {
  db.withTransactionSync(() => {
    const c = countQuestions();
    if (c > 0) return;

    const now = Date.now();
    db.runSync(INSERT_QUESTION, ["React Nativeとは？", "クロス開発用フレームワーク", now]);
    db.runSync(INSERT_QUESTION, ["SQLiteの使い道", "端末内に軽量DBを持てる", now]);
    db.runSync(INSERT_QUESTION, ["useStateの役割", "状態を持たせるReactフック", now]);
  });
}
