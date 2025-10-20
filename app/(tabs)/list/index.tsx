import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { router } from "expo-router";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FAB, List } from "react-native-paper";
import { useRefetchOnFocus } from "@/features/common/useRefetchOnFocus";
import { useListQuestions } from "@/features/questions/useCases/useListQuestions";
import { tokens } from "@/lib/theme/tokens";
import { AppScreen } from "@/lib/ui/AppScreen";
import { AppTopBar } from "@/lib/ui/AppTopBar";

export default function QuestionListScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const { items, refetch } = useListQuestions();
  useRefetchOnFocus(refetch);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { paddingBottom: tokens.spacing.md + tabBarHeight },
        text: { padding: tokens.spacing.md },
        fab: {
          position: "absolute",
          bottom: tokens.spacing.xl + tabBarHeight,
          right: tokens.spacing.xl,
        },
      }),
    [tabBarHeight],
  );

  return (
    <AppScreen scroll>
      <AppTopBar title="LIST" />
      <View style={styles.container}>
        {items.length === 0 ? (
          <Text style={styles.text}>まだ暗記項目がありません</Text>
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
      </View>
      <FAB icon="plus" style={styles.fab} onPress={() => router.push("/(tabs)/list/new")} />
    </AppScreen>
  );
}
