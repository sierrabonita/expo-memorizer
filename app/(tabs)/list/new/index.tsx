import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import QuestionForm from "@/components/QuestionForm";
import { AppTopBar } from "@/lib/ui/AppTopBar";

export default function CreateQuestionScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      edges={["top", "left", "right"]}
    >
      <AppTopBar title="Create Question" canBack={true} />
      <QuestionForm mode="create" />
    </SafeAreaView>
  );
}
