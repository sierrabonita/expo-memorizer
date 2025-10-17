import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Provider as PaperProvider } from "react-native-paper";
import { DBProvider } from "@/lib/db/provider";
import paperTheme from "@/lib/theme/paperTheme";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <PaperProvider theme={paperTheme}>
      <DBProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </DBProvider>
    </PaperProvider>
  );
}
