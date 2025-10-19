import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { FAB, List, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { type Question, useQuestionsRepository } from "@/lib/db/repositories/questionsRepository";
import { tokens } from "@/lib/theme/tokens";
import { AppTopBar } from "@/lib/ui/AppTopBar";

export default function QuestionListScreen() {
  const { getAllQuestions } = useQuestionsRepository();
  const theme = useTheme();
  const tabBarHeight = useBottomTabBarHeight();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        safeAreaView: {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
        scrollView: {
          padding: tokens.spacing.sm,
          paddingBottom: tokens.spacing.sm + tabBarHeight,
        },
        scrollViewText: { padding: tokens.spacing.md },
        fab: {
          position: "absolute",
          bottom: tokens.spacing.xl,
          right: tokens.spacing.xl,
        },
      }),
    [theme, tabBarHeight],
  );

  const [items, setItems] = useState<Question[]>([]);

  const refetchOnFocus = useCallback(() => {
    (async () => {
      try {
        const data = await getAllQuestions();
        setItems(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAllQuestions]);

  useFocusEffect(refetchOnFocus);

  return (
    <SafeAreaView style={styles.safeAreaView} edges={["top", "left", "right"]}>
      <AppTopBar title="LIST" />

      <ScrollView contentContainerStyle={styles.scrollView}>
        {items.length === 0 ? (
          <Text style={styles.scrollViewText}>まだ暗記項目がありません</Text>
        ) : (
          items.map((q) => (
            <List.Item
              key={q.id}
              title={q.prompt}
              description={q.answer || "（内容なし）"}
              onPress={() => router.push(`/(tabs)/list/${q.id}`)}
              left={(props) => <List.Icon {...props} icon="book-outline" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
            />
          ))
        )}
      </ScrollView>

      <FAB icon="plus" style={styles.fab} onPress={() => router.push("/(tabs)/list/new")} />
    </SafeAreaView>
  );
}
