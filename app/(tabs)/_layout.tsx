import { Tabs } from "expo-router";
import { t } from "@/locales";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen name="index" options={{ title: t("nav.top") }} />
      <Tabs.Screen name="list" options={{ title: t("nav.list") }} />
    </Tabs>
  );
}
