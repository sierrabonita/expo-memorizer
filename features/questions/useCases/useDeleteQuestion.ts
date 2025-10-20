import { useCallback } from "react";
import { useQuestionsRepository } from "@/lib/db/repositories/questionsRepository";

export function useDeleteQuestion() {
  const { removeQuestion } = useQuestionsRepository();

  return useCallback(
    async (id: number) => {
      await removeQuestion(id);
    },
    [removeQuestion],
  );
}
