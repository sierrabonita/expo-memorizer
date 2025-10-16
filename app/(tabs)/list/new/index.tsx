import { router } from "expo-router";
import { View } from "react-native";
import { Appbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import QuestionForm from "@/components/QuestionForm";

export default function CreateQuestionScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <Appbar.Header statusBarHeight={0}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Create Question" style={{ alignItems: "center" }} />
        <View style={{ width: 48 }} />
      </Appbar.Header>
      <QuestionForm mode="create" />
    </SafeAreaView>
  );
}
