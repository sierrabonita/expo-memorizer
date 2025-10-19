import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import QuestionForm from "@/components/QuestionForm";
import { AppTopBar } from "@/lib/ui/AppTopBar";

export default function CreateQuestionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        safeAreaView: {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
      }),
    [theme],
  );

  return (
    <SafeAreaView style={styles.safeAreaView} edges={["top", "left", "right"]}>
      <AppTopBar title="Edit Question" canBack={true} />
      <QuestionForm mode="edit" id={Number(id)} />
    </SafeAreaView>
  );
}
