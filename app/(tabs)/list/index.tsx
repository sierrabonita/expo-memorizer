import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView } from "react-native";
import { Appbar, FAB, List, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { type Question, useQuestionsRepository } from "@/lib/db/repositories/questionsRepository";

export default function QuestionListScreen() {
  const { getAllQuestions } = useQuestionsRepository();
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
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <Appbar.Header statusBarHeight={0}>
        <Appbar.Content title="LIST" style={{ alignItems: "center" }} />
      </Appbar.Header>

      <ScrollView>
        {items.length === 0 ? (
          <Text style={{ padding: 16 }}>まだ暗記項目がありません</Text>
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

      <FAB
        icon="plus"
        style={{
          position: "absolute",
          bottom: 24,
          right: 24,
        }}
        onPress={() => router.push("/(tabs)/list/new")}
      />
    </SafeAreaView>
  );
}
