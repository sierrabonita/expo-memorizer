import { router } from "expo-router";
import { useState } from "react";
import QuestionForm from "@/components/QuestionForm";
import { useCreateQuestion } from "@/features/questions/useCases/useCreateQuestion";
import { AppScreen } from "@/lib/ui/AppScreen";
import { AppTopBar } from "@/lib/ui/AppTopBar";

export default function CreateQuestionScreen() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const create = useCreateQuestion();

  const onSubmit = async () => {
    if (!title.trim()) return;
    setLoading(true);
    try {
      await create({ prompt: title, answer: body });
      router.replace("/(tabs)/list");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppScreen>
      <AppTopBar title="Create" canBack />
      <QuestionForm
        mode="create"
        title={title}
        body={body}
        loading={loading}
        onChangeTitle={setTitle}
        onChangeBody={setBody}
        onSubmit={onSubmit}
      />
    </AppScreen>
  );
}
