// lib/theme/paperTheme.ts
import { MD3LightTheme, type MD3Theme } from "react-native-paper";

/**
 * React Native Paper 用のライトテーマ（MD3）
 */
const paperTheme: MD3Theme = {
  ...MD3LightTheme,
  roundness: 12,
  colors: {
    ...MD3LightTheme.colors,
    // Brand colors
    primary: "#3B82F6", // blue-500
    primaryContainer: "#DBEAFE", // blue-100
    secondary: "#10B981", // emerald-500
    secondaryContainer: "#D1FAE5", // emerald-100
    tertiary: "#F59E0B", // amber-500

    // Surfaces
    surface: "#FFFFFF",
    surfaceVariant: "#F3F4F6", // gray-100
    background: "#FFFFFF",

    // Text on surfaces/background
    onBackground: "#111827", // gray-900
    onSurface: "#111827",

    // Others
    outline: "#E5E7EB", // gray-200
    error: "#EF4444", // red-500
  },
};

export default paperTheme;
