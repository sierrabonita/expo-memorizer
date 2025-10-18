import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";
import { useColorScheme } from "@/components/useColorScheme";
import { DBProvider } from "@/lib/db/provider";
import { paperThemeDark, paperThemeLight } from "@/lib/theme/paperTheme";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const scheme = useColorScheme(); // "light" | "dark"
  const isDark = scheme === "dark";
  const theme = isDark ? paperThemeDark : paperThemeLight;

  return (
    <PaperProvider theme={theme}>
      <DBProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            // 画面背景のちらつき防止
            contentStyle: { backgroundColor: theme.colors.background },
          }}
        />
        <StatusBar style={isDark ? "light" : "dark"} />
      </DBProvider>
    </PaperProvider>
  );
}
