import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Snackbar, Text, TextInput, useTheme } from "react-native-paper";
import { useQuestionsRepository } from "@/lib/db/repositories/questionsRepository";
import { tokens } from "@/lib/theme/tokens";

type Props = { mode: "create" } | { mode: "edit"; id: number };

export default function QuestionForm(props: Props) {
  const isEdit = props.mode === "edit";
  const id = isEdit ? props.id : undefined;

  const theme = useTheme();
  const { getQuestionById, createQuestion, updateQuestion, removeQuestion } =
    useQuestionsRepository();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        loadingContainer: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: tokens.spacing.md,
        },
        loadingText: { marginTop: tokens.spacing.sm },
        formContainer: { flex: 1, padding: tokens.spacing.md, gap: tokens.spacing.sm },
        formInputBody: { minHeight: 120 },
        formButtonContainer: { flexDirection: "row", gap: tokens.spacing.xs },
        formButton: { flex: 1 },
      }),
    [],
  );

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
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
        <Text style={styles.loadingText}>読み込み中…</Text>
      </View>
    );
  }

  return (
    <View style={styles.formContainer}>
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
        style={styles.formInputBody}
      />

      <View style={styles.formButtonContainer}>
        <Button
          mode="contained"
          buttonColor={theme.colors.primary}
          onPress={handleSave}
          disabled={!title.trim()}
          style={styles.formButton}
        >
          {isEdit ? "更新" : "作成"}
        </Button>

        {isEdit && (
          <Button
            mode="contained"
            buttonColor={theme.colors.errorContainer}
            textColor={theme.colors.error}
            onPress={handleDelete}
            style={styles.formButton}
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
