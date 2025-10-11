import { Stack } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";
import paperTheme from "@/lib/theme/paperTheme";

export default function RootLayout() {
  return (
    <PaperProvider theme={paperTheme}>
      <Stack screenOptions={{ headerShown: false }} />
    </PaperProvider>
  );
}
