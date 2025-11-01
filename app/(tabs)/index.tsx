import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { tokens } from "@/lib/theme/tokens";
import { t } from "@/locales";

export default function TopScreen() {
  const theme = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        safeAreaView: {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
        container: {
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          gap: tokens.spacing.sm,
          backgroundColor: theme.colors.primaryContainer,
        },
        text: { textAlign: "center" },
        buttonStyle: { width: 180, height: 180, borderRadius: 90 },
        buttonContentStyle: {
          width: 180,
          height: 180,
        },
        buttonLabelStyle: {
          fontSize: 30,
          lineHeight: 34,
          includeFontPadding: false,
        },
      }),
    [theme],
  );

  return (
    <SafeAreaView style={styles.safeAreaView} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <Text variant="titleLarge" style={styles.text}>
          {t("screen.top.title")}
        </Text>
        <Button
          mode="contained"
          buttonColor={theme.colors.primary}
          onPress={() => console.log("Pressed")}
          style={styles.buttonStyle}
          contentStyle={styles.buttonContentStyle}
          labelStyle={styles.buttonLabelStyle}
        >
          {t("screen.top.start")}
        </Button>
      </View>
    </SafeAreaView>
  );
}
