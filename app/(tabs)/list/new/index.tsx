import { SafeAreaView } from "react-native-safe-area-context";
import QuestionForm from "@/components/QuestionForm";
import { AppTopBar } from "@/lib/ui/AppTopBar";

export default function CreateQuestionScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <AppTopBar title="Create Question" canBack={true} />
      <QuestionForm mode="create" />
    </SafeAreaView>
  );
}
