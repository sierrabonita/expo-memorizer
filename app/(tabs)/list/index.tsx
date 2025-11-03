import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { router } from "expo-router";
import { useCallback, useMemo, useRef } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { FAB, Portal } from "react-native-paper";
import SwipeableRow from "@/components/SwipeableRow";
import { useRefetchOnFocus } from "@/features/common/useRefetchOnFocus";
import { useDeleteQuestion } from "@/features/questions/useCases/useDeleteQuestion";
import { useListQuestions } from "@/features/questions/useCases/useListQuestions";
import { tokens } from "@/lib/theme/tokens";
import { AppScreen } from "@/lib/ui/AppScreen";
import { AppTopBar } from "@/lib/ui/AppTopBar";
import { t } from "@/locales";

type CloseRow = () => void;

export default function QuestionListScreen() {
  const remove = useDeleteQuestion();
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
        rightAction: {
          width: 50,
          height: 50,
          backgroundColor: "green",
          alignItems: "center",
          justifyContent: "center",
        },
        leftAction: {
          width: 50,
          height: 50,
          backgroundColor: "red",
          alignItems: "center",
          justifyContent: "center",
        },
        separator: {
          width: "100%",
          borderTopWidth: 1,
        },

        swipeable: {
          alignItems: "center",
        },
      }),
    [tabBarHeight],
  );

  const closeOpenRowRef = useRef<CloseRow | null>(null);

  const handleWillOpen = useCallback((closeRow: CloseRow) => {
    // 同じ行なら閉じない（自分で自分を閉じない）
    if (closeOpenRowRef.current && closeOpenRowRef.current !== closeRow) {
      closeOpenRowRef.current();
    }
    // いま開いた行を閉じるための関数を保存
    closeOpenRowRef.current = closeRow;
  }, []);

  const handleDidClose = useCallback((closeRow: CloseRow) => {
    // 参照しているのが自分ならクリア
    if (closeOpenRowRef.current === closeRow) {
      closeOpenRowRef.current = null;
    }
  }, []);

  const onDelete = (id: number) => {
    if (!id) return;
    Alert.alert(t("modal.confirmDeleteTitle"), t("modal.confirmDeleteMessage"), [
      { text: t("button.cancel") },
      {
        text: t("button.delete"),
        style: "destructive",
        onPress: async () => {
          await remove(id);
          router.replace("/(tabs)/list");
        },
      },
    ]);
  };

  const onEdit = (id: number) => {
    router.push(`/(tabs)/list/${id}`);
  };

  return (
    <AppScreen scroll>
      <AppTopBar title={t("nav.list")} />
      <View style={styles.container}>
        {items.length === 0 ? (
          <Text style={styles.text}>{t("screen.list.empty")}</Text>
        ) : (
          items.map((q) => (
            <SwipeableRow
              key={q.id}
              id={String(q.id)}
              title={q.prompt}
              description={q.answer || t("screen.list.item.noContent")}
              leftIcon={"trash-can"}
              rightIcon={"cog"}
              onPressLeftIcon={() => onDelete(q.id)}
              onPressRightIcon={() => onEdit(q.id)}
              onWillOpen={handleWillOpen}
              onDidClose={handleDidClose}
            />
          ))
        )}
      </View>
      <Portal>
        <FAB icon="plus" style={styles.fab} onPress={() => router.push("/(tabs)/list/new")} />
      </Portal>
    </AppScreen>
  );
}
