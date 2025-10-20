import { useCallback, useEffect, useState } from "react";
import { type Question, useQuestionsRepository } from "@/lib/db/repositories/questionsRepository";

export function useLoadQuestion(id: number | null) {
  const { getQuestionById } = useQuestionsRepository();

  const [data, setData] = useState<Question | null>(null);
  const [loading, setLoading] = useState<boolean>(!!id);

  const load = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      setData(await getQuestionById(id));
    } finally {
      setLoading(false);
    }
  }, [id, getQuestionById]);

  useEffect(() => {
    void load();
  }, [load]);

  return { data, loading, reload: load };
}
