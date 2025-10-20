import { useCallback } from "react";
import { useQuestionsRepository } from "@/lib/db/repositories/questionsRepository";

export function useCreateQuestion() {
  const { createQuestion } = useQuestionsRepository();

  return useCallback(
    async (input: { prompt: string; answer: string }) => {
      await createQuestion({ prompt: input.prompt.trim(), answer: input.answer.trim() });
    },
    [createQuestion],
  );
}
