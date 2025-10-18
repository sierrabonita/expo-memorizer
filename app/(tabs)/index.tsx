import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { tokens } from "@/lib/theme/tokens";

export default function TopScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      edges={["top", "left", "right"]}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          gap: tokens.spacing.sm,
          backgroundColor: theme.colors.primaryContainer,
        }}
      >
        <Text variant="titleLarge" style={{ textAlign: "center" }}>
          Title
        </Text>
        <Button
          mode="contained"
          buttonColor={theme.colors.primary}
          onPress={() => console.log("Pressed")}
          style={{ width: 180, height: 180, borderRadius: 90 }}
          contentStyle={{
            width: 180,
            height: 180,
          }}
          labelStyle={{
            fontSize: 30,
            lineHeight: 34,
            includeFontPadding: false,
          }}
        >
          START
        </Button>
      </View>
    </SafeAreaView>
  );
}
