import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "TOP" }} />
      <Tabs.Screen name="list" options={{ title: "LIST" }} />
    </Tabs>
  );
}
