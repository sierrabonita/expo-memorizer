import { useCallback, useState } from "react";
import { type Question, useQuestionsRepository } from "@/lib/db/repositories/questionsRepository";

export function useListQuestions() {
  const { getAllQuestions } = useQuestionsRepository();

  const [items, setItems] = useState<Question[]>([]);

  const refetch = useCallback(async () => {
    const data = await getAllQuestions();
    setItems(data);
  }, [getAllQuestions]);

  return { items, refetch };
}
