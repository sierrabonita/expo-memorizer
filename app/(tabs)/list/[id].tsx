import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import QuestionForm from "@/components/QuestionForm";
import { useRouteQuestionId } from "@/features/questions/adapters/useRouteQuestionId";
import { useDeleteQuestion } from "@/features/questions/useCases/useDeleteQuestion";
import { useLoadQuestion } from "@/features/questions/useCases/useLoadQuestion";
import { useUpdateQuestion } from "@/features/questions/useCases/useUpdateQuestion";
import { AppScreen } from "@/lib/ui/AppScreen";
import { AppTopBar } from "@/lib/ui/AppTopBar";

export default function EditQuestionScreen() {
  const id = useRouteQuestionId();
  const { data, loading } = useLoadQuestion(id);
  const update = useUpdateQuestion();
  const remove = useDeleteQuestion();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (data) {
      setTitle(data.prompt);
      setBody(data.answer ?? "");
    }
  }, [data]);

  const onSubmit = async () => {
    if (!id) return;
    await update(id, { prompt: title, answer: body });
    router.replace("/(tabs)/list");
  };

  const onDelete = () => {
    if (!id) return;
    Alert.alert("削除確認", "この項目を削除しますか？", [
      { text: "キャンセル" },
      {
        text: "削除する",
        style: "destructive",
        onPress: async () => {
          await remove(id);
          router.replace("/(tabs)/list");
        },
      },
    ]);
  };

  return (
    <AppScreen>
      <AppTopBar title="Edit" canBack />
      <QuestionForm
        mode="edit"
        title={title}
        body={body}
        loading={loading}
        onChangeTitle={setTitle}
        onChangeBody={setBody}
        onSubmit={onSubmit}
        onDelete={onDelete}
        submitLabel="更新"
      />
    </AppScreen>
  );
}
