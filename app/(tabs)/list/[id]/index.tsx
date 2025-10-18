import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import QuestionForm from "@/components/QuestionForm";
import { AppTopBar } from "@/lib/ui/AppTopBar";

export default function CreateQuestionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <AppTopBar title="Edit Question" canBack={true} />
      <QuestionForm mode="edit" id={Number(id)} />
    </SafeAreaView>
  );
}
