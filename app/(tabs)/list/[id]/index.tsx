import { router, useLocalSearchParams } from "expo-router";
import { Appbar } from "react-native-paper";
import QuestionForm from "@/components/QuestionForm";

export default function CreateQuestionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Edit Question" />
      </Appbar.Header>
      <QuestionForm mode="edit" id={Number(id)} />
    </>
  );
}
