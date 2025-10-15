import { router, useLocalSearchParams } from "expo-router";
import { Appbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import QuestionForm from "@/components/QuestionForm";

export default function CreateQuestionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <Appbar.Header statusBarHeight={0}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Edit Question" />
      </Appbar.Header>
      <QuestionForm mode="edit" id={Number(id)} />
    </SafeAreaView>
  );
}
