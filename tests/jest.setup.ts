import "@testing-library/react-native";
import "react-native-gesture-handler/jestSetup";

jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  // 一部環境で .default.call が未定義で警告が出る対策
  Reanimated.default.call = () => {};
  return Reanimated;
});
