import type { SQLiteDatabase } from "expo-sqlite";

export async function seedQuestionsIfEmptyAsync(db: SQLiteDatabase) {
  const row = await db.getFirstAsync<{ cnt: number }>(`SELECT COUNT(*) as cnt FROM questions`);
  if (row?.cnt && row.cnt > 0) return;

  const sources = [
    ["What is React Native?", "A framework for building native apps using React!"],
    ["What is Expo?", "A set of tools and services for React Native apps"],
    ["Q1", "A1"],
    ["Q2", "A2"],
    ["Q3", "A3"],
    ["Q4", "A4"],
    ["Q5", "A5"],
    ["Q6", "A6"],
    ["Q7", "A7"],
    ["Q8", "A8"],
    ["Q9", "A9"],
  ];

  await db.withTransactionAsync(async () => {
    for (const [prompt, answer] of sources) {
      await db.runAsync(
        `INSERT INTO questions (prompt, answer, due_at) VALUES (?, ?, datetime('now'))`,
        [prompt, answer],
      );
    }
  });
}
