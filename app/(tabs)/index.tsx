import { View } from "react-native";
import { Appbar, Button, Text } from "react-native-paper";

export default function TopScreen() {
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="TOP" />
      </Appbar.Header>

      <View style={{ flex: 1, padding: 16, gap: 10 }}>
        <Text variant="titleLarge" style={{ textAlign: "center" }}>
          Title
        </Text>
        <View
          style={{
            alignItems: "center",
            flex: 1,
          }}
        >
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
      </View>
    </>
  );
}
