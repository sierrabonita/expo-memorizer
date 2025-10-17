import type { SQLiteDatabase } from "expo-sqlite";

export async function seedQuestionsIfEmptyAsync(db: SQLiteDatabase) {
  const row = await db.getFirstAsync<{ cnt: number }>(`SELECT COUNT(*) as cnt FROM questions`);
  if (row?.cnt && row.cnt > 0) return;

  await db.withTransactionAsync(async () => {
    await db.runAsync(
      `INSERT INTO questions (prompt, answer, due_at) VALUES (?, ?, datetime('now'))`,
      ["What is React Native?", "A framework for building native apps using React!"],
    );
    await db.runAsync(
      `INSERT INTO questions (prompt, answer, due_at) VALUES (?, ?, datetime('now'))`,
      ["What is Expo?", "A set of tools and services for React Native apps"],
    );
  });
}
