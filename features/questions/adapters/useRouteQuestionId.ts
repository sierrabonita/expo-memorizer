import { useLocalSearchParams } from "expo-router";

export function useRouteQuestionId(): number | null {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const n = Number(id);

  return Number.isFinite(n) ? n : null;
}
