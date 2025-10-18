import { router } from "expo-router";
import { View } from "react-native";
import { Appbar, useTheme } from "react-native-paper";

export function AppTopBar({
  title,
  canBack,
  right,
}: {
  title: string;
  canBack?: boolean;
  right?: React.ReactNode;
}) {
  const theme = useTheme();
  return (
    <Appbar.Header statusBarHeight={0} style={{ backgroundColor: theme.colors.surface }}>
      {canBack ? (
        <Appbar.BackAction onPress={() => router.back()} />
      ) : (
        <View style={{ width: 48 }} />
      )}
      <Appbar.Content title={title} style={{ alignItems: "center" }} />
      <View style={{ width: 48 }}>{right}</View>
    </Appbar.Header>
  );
}
