import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { ActivityIndicator, Appbar, FAB, List, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAllQuestions } from "../../../lib/db/questionsRepository";

type Question = {
  id: number;
  title: string;
  body: string | null;
  created_at: number;
};

export default function QuestionListScreen() {
  const tabH = useBottomTabBarHeight();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchQuestions = useCallback(async () => {
    try {
      const data = await getAllQuestions();

      setQuestions(data);
    } catch (e) {
      console.error("Error loading questions:", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  if (loading) {
    return (
      <ActivityIndicator style={{ flex: 1, justifyContent: "center", alignItems: "center" }} />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <Appbar.Header statusBarHeight={0}>
        <Appbar.Content title="LIST" />
      </Appbar.Header>

      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchQuestions} />}
      >
        {questions.length === 0 ? (
          <Text style={{ padding: 16 }}>まだ暗記項目がありません</Text>
        ) : (
          questions.map((q) => (
            <List.Item
              key={q.id}
              title={q.title}
              description={q.body || "（内容なし）"}
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
