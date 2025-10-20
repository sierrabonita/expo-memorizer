import { useCallback } from "react";
import { useQuestionsRepository } from "@/lib/db/repositories/questionsRepository";

export function useUpdateQuestion() {
  const { updateQuestion } = useQuestionsRepository();

  return useCallback(
    async (id: number, input: { prompt: string; answer: string }) => {
      await updateQuestion(id, { prompt: input.prompt.trim(), answer: input.answer.trim() });
    },
    [updateQuestion],
  );
}
