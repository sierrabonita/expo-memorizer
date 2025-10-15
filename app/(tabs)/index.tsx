import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TopScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          gap: 10,
          backgroundColor: "#ff0",
        }}
      >
        <Text variant="titleLarge" style={{ textAlign: "center" }}>
          Title
        </Text>
        <Button
          mode="contained"
          onPress={() => console.log("Pressed")}
          style={{ width: 180, height: 180, borderRadius: 90 }}
          contentStyle={{
            width: 180,
            height: 180,
          }}
          labelStyle={{
            fontSize: 30,
            lineHeight: 34,
            includeFontPadding: false,
          }}
        >
          START
        </Button>
      </View>
    </SafeAreaView>
  );
}
