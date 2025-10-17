import { Stack } from "expo-router";

export default function ListLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        // 削除時にrouter.back()だと画面が右から左にアニメーションしてしまう(push:進む表現)
        // router.replace()で代用するも同じ挙動のため、replaceでは左から右にアニメーション（pop:戻る表現）に変更する
        animationTypeForReplace: "pop",
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
