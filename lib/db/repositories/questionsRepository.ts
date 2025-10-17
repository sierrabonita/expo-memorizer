import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useMemo } from "react";

export type Question = {
  id: number;
  prompt: string;
  answer: string;
  ease_factor: number;
  interval_days: number;
  due_at: string | null;
  created_at: string;
  updated_at: string;
};

export type CreateQuestionInput = Pick<Question, "prompt" | "answer">;

export function useQuestionsRepository() {
  const db = useSQLiteContext();

  const getAllQuestions = useCallback(
    async (): Promise<Question[]> =>
      db.getAllAsync<Question>(`SELECT * FROM questions ORDER BY updated_at DESC`),
    [db],
  );

  const getQuestionById = useCallback(
    async (id: number): Promise<Question | null> =>
      db.getFirstSync<Question>(`SELECT * FROM questions WHERE id = ?;`, [id]) ?? null,
    [db],
  );

  const listDueToday = useCallback(
    async (nowISO: string): Promise<Question[]> =>
      db.getAllAsync<Question>(
        `SELECT * FROM questions WHERE due_at IS NULL OR due_at <= ? ORDER BY COALESCE(due_at, '1970-01-01') ASC`,
        [nowISO],
      ),
    [db],
  );

  const createQuestion = useCallback(
    async (q: Pick<Question, "prompt" | "answer">) => {
      await db.withTransactionAsync(async () => {
        await db.runAsync(`INSERT INTO questions (prompt, answer) VALUES (?, ?)`, [
          q.prompt,
          q.answer,
        ]);
      });
    },
    [db],
  );

  const updateQuestion = useCallback(
    async (id: number, patch: Partial<CreateQuestionInput>) => {
      const sets: string[] = [];
      const vals: (string | number | null)[] = [];

      if (typeof patch.prompt === "string") {
        sets.push(`prompt=?`);
        vals.push(patch.prompt);
      }
      if (typeof patch.answer === "string") {
        sets.push(`answer=?`);
        vals.push(patch.answer);
      }
      if (!sets.length) return;
      vals.push(id);

      await db.withTransactionAsync(async () => {
        await db.runAsync(
          `UPDATE questions SET ${sets.join(", ")}, updated_at=datetime('now') WHERE id=?`,
          vals,
        );
      });
    },
    [db],
  );

  const removeQuestion = useCallback(
    async (id: number) =>
      db.withTransactionAsync(async () => {
        await db.runAsync(`DELETE FROM questions WHERE id=?`, [id]);
      }),
    [db],
  );

  return useMemo(
    () => ({
      getAllQuestions,
      getQuestionById,
      listDueToday,
      createQuestion,
      updateQuestion,
      removeQuestion,
    }),
    [
      getAllQuestions,
      getQuestionById,
      listDueToday,
      createQuestion,
      updateQuestion,
      removeQuestion,
    ],
  );
}
