import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { tokens } from "@/lib/theme/tokens";
import { t } from "@/locales";

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
        label={t("form.title.label")}
        value={title}
        onChangeText={(v) => {
          onChangeTitle(v);
          !touched && setTouched(true);
        }}
        autoFocus
      />
      <TextInput
        mode="outlined"
        label={t("form.body.label")}
        value={body}
        onChangeText={onChangeBody}
        multiline
        numberOfLines={6}
      />
      <Button mode="contained" onPress={onSubmit} disabled={!canSubmit} loading={!!loading}>
        {submitLabel ?? (mode === "edit" ? t("button.update") : t("button.create"))}
      </Button>
      {mode === "edit" && onDelete && (
        <Button mode="text" onPress={onDelete}>
          {t("button.delete")}
        </Button>
      )}
    </View>
  );
}
