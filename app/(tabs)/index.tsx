import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import TodayReviewSheet from "@/components/TodayReviewSheet";
import { tokens } from "@/lib/theme/tokens";
import BottomSheet from "@/lib/ui/BottomSheet";
import { t } from "@/locales";

export default function TopScreen() {
  const theme = useTheme();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        safeAreaView: {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
        container: {
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          gap: tokens.spacing.sm,
          backgroundColor: theme.colors.primaryContainer,
        },
        text: { textAlign: "center" },
        buttonStyle: { width: 180, height: 180, borderRadius: 90 },
        buttonContentStyle: {
          width: 180,
          height: 180,
        },
        buttonLabelStyle: {
          fontSize: 30,
          lineHeight: 34,
          includeFontPadding: false,
        },
      }),
    [theme],
  );

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleOnChange = useCallback(() => {
    console.log("handleOnChange");
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <Text variant="titleLarge" style={styles.text}>
          {t("screen.top.title")}
        </Text>
        <Button
          mode="contained"
          buttonColor={theme.colors.primary}
          onPress={handlePresentModalPress}
          style={styles.buttonStyle}
          contentStyle={styles.buttonContentStyle}
          labelStyle={styles.buttonLabelStyle}
        >
          {t("screen.top.start")}
        </Button>
        <BottomSheet ref={bottomSheetModalRef} onChange={handleOnChange}>
          <TodayReviewSheet />
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
}
