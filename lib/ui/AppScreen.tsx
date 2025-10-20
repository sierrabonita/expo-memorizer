import type React from "react";
import { useMemo } from "react";
import { ScrollView, StyleSheet, View, type ViewProps } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { tokens } from "@/lib/theme/tokens";

type Props = {
  children: React.ReactNode;
  /**
   * true: スクロール画面（content は contentContainerStyle で余白）
   * false: 非スクロール（children はそのまま）
   */
  scroll?: boolean;
  /** デフォルトは上・左・右。下はタブに任せる */
  edges?: ("top" | "bottom" | "left" | "right")[];
  /** コンテンツの追加パディング（デフォは md） */
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
