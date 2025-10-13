import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import paperTheme from "@/lib/theme/paperTheme";
import { ensureMigrationsSync } from "../lib/db/migrations";
import { seedQuestionsIfEmptySync } from "../lib/db/questionsRepository";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        ensureMigrationsSync();
        seedQuestionsIfEmptySync();
      } catch (e) {
        console.error("DB init failed", e);
      } finally {
        setReady(true);
        SplashScreen.hideAsync();
      }
    })();
  }, []);

  if (!ready) return null;

  return (
    <PaperProvider theme={paperTheme}>
      <Stack screenOptions={{ headerShown: false }} />
    </PaperProvider>
  );
}
