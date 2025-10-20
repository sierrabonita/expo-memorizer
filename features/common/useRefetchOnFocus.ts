import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export function useRefetchOnFocus(fn: () => unknown | Promise<unknown>): void {
  useFocusEffect(
    useCallback(() => {
      void fn();
    }, [fn]),
  );
}
