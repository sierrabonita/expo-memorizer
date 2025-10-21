import type React from "react";
import { useMemo } from "react";
import { ScrollView, StyleSheet, View, type ViewProps } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { tokens } from "@/lib/theme/tokens";

type Props = {
  children: React.ReactNode;
  scroll?: boolean;
  edges?: ("top" | "bottom" | "left" | "right")[];
  padding?: number;
} & Pick<ViewProps, "style">;

export function AppScreen({
  children,
  scroll = false,
  edges = ["top", "left", "right"],
  style,
}: Props) {
  const theme = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        root: {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
        contentPadding: {
          padding: tokens.spacing.md,
        },
      }),
    [theme],
  );

  return (
    <SafeAreaView style={[styles.root, style]} edges={edges}>
      {scroll ? (
        <ScrollView contentContainerStyle={[styles.contentPadding]}>{children}</ScrollView>
      ) : (
        <View style={[styles.contentPadding]}>{children}</View>
      )}
    </SafeAreaView>
  );
}
