import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { ActivityIndicator, Button, Snackbar, Text, TextInput, useTheme } from "react-native-paper";
import { useQuestionsRepository } from "@/lib/db/repositories/questionsRepository";

type Props = { mode: "create" } | { mode: "edit"; id: number };

export default function QuestionForm(props: Props) {
  const isEdit = props.mode === "edit";
  const id = isEdit ? props.id : undefined;

  const theme = useTheme();
  const { getQuestionById, createQuestion, updateQuestion, removeQuestion } =
    useQuestionsRepository();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(isEdit);
  const [snack, setSnack] = useState("");

  useEffect(() => {
    if (!isEdit || !id) return;
    (async () => {
      const data = await getQuestionById(id);

      if (data) {
        setTitle(data.prompt);
        setBody(data.answer ?? "");
      }

      setLoading(false);
    })();
  }, [isEdit, id, getQuestionById]);

  const handleSave = async () => {
    if (!title.trim()) return;
    if (isEdit && id) {
      await updateQuestion(id, { prompt: title.trim(), answer: body.trim() });
      setSnack("更新しました");
    } else {
      await createQuestion({ prompt: title.trim(), answer: body.trim() });
      setSnack("作成しました");
      setTitle("");
      setBody("");
    }
    setTimeout(() => router.back(), 300);
  };

  const handleDelete = () => {
    if (!isEdit || !id) return;
    Alert.alert("削除確認", "この項目を削除しますか？", [
      { text: "キャンセル" },
      {
        text: "削除する",
        style: "destructive",
        onPress: async () => {
          await removeQuestion(id);
          setSnack("削除しました");
          setTimeout(() => router.replace("/(tabs)/list"), 300);
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16 }}>
        <ActivityIndicator />
        <Text style={{ marginTop: 12 }}>読み込み中…</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <TextInput
        label="タイトル"
        value={title}
        onChangeText={setTitle}
        mode="outlined"
        autoFocus={!isEdit}
      />
      <TextInput
        label="本文"
        value={body}
        onChangeText={setBody}
        mode="outlined"
        multiline
        numberOfLines={5}
        style={{ minHeight: 120 }}
      />

      <View style={{ flexDirection: "row", gap: 8 }}>
        <Button
          mode="contained"
          buttonColor={theme.colors.primary}
          onPress={handleSave}
          disabled={!title.trim()}
          style={{ flex: 1 }}
        >
          {isEdit ? "更新" : "作成"}
        </Button>

        {isEdit && (
          <Button
            mode="contained"
            buttonColor={theme.colors.errorContainer}
            textColor={theme.colors.error}
            onPress={handleDelete}
            style={{ flex: 1 }}
          >
            削除
          </Button>
        )}
      </View>

      <Snackbar visible={!!snack} onDismiss={() => setSnack("")} duration={900}>
        {snack}
      </Snackbar>
    </View>
  );
}
