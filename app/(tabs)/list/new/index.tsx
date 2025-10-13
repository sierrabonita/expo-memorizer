import { router } from "expo-router";
import { Appbar } from "react-native-paper";
import QuestionForm from "@/components/QuestionForm";

export default function CreateQuestionScreen() {
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Create Question" />
      </Appbar.Header>
      <QuestionForm mode="create" />
    </>
  );
}
