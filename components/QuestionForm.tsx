import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { tokens } from "@/lib/theme/tokens";

type Props = {
  mode: "create" | "edit";
  title: string;
  body: string;
  loading?: boolean;
  onChangeTitle: (v: string) => void;
  onChangeBody: (v: string) => void;
  onSubmit: () => void;
  onDelete?: () => void;
  submitLabel?: string;
};

export default function QuestionForm({
  mode,
  title,
  body,
  loading,
  onChangeTitle,
  onChangeBody,
  onSubmit,
  onDelete,
  submitLabel,
}: Props) {
  const [touched, setTouched] = useState(false);
  const canSubmit = title.trim().length > 0 && !loading;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { padding: tokens.spacing.md, gap: tokens.spacing.sm },
      }),
    [],
  );

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label="タイトル"
        value={title}
        onChangeText={(v) => {
          onChangeTitle(v);
          !touched && setTouched(true);
        }}
        autoFocus
      />
      <TextInput
        mode="outlined"
        label="本文"
        value={body}
        onChangeText={onChangeBody}
        multiline
        numberOfLines={6}
      />
      <Button mode="contained" onPress={onSubmit} disabled={!canSubmit} loading={!!loading}>
        {submitLabel ?? (mode === "edit" ? "更新" : "作成")}
      </Button>
      {mode === "edit" && onDelete && (
        <Button mode="text" onPress={onDelete}>
          削除
        </Button>
      )}
    </View>
  );
}
