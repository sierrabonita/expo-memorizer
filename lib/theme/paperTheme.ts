import {
  MD3DarkTheme as DefaultDark,
  MD3LightTheme as DefaultLight,
  type MD3Theme,
} from "react-native-paper";
import { fonts } from "@/lib/theme/fonts";
import { tokens } from "@/lib/theme/tokens";

const common = {
  isV3: true,
  roundness: tokens.radius.lg,
  fonts,
} as const;

export const paperThemeLight: MD3Theme = {
  ...DefaultLight,
  ...common,
  colors: {
    ...DefaultLight.colors,
    primary: tokens.color.brand,
    primaryContainer: tokens.color.brandContainer,
    background: "#FFFFFF",
    surface: "#FFFFFF",
    surfaceVariant: "#F4F6FA",
    outline: "#D6DAE1",
  },
};

export const paperThemeDark: MD3Theme = {
  ...DefaultDark,
  ...common,
  colors: {
    ...DefaultDark.colors,
    primary: tokens.color.brand,
    primaryContainer: "#2F3A64",
    background: "#0E1116",
    surface: "#141821",
    surfaceVariant: "#1D2330",
    outline: "#404653",
  },
};
