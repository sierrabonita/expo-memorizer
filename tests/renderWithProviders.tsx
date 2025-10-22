import { type RenderOptions, render } from "@testing-library/react-native";
import type React from "react";
import type { PropsWithChildren } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

type ProvidersProps = PropsWithChildren<{
  extraProviders?: Array<(children: React.ReactNode) => React.ReactElement>;
}>;

const initialWindowMetrics = {
  frame: { x: 0, y: 0, width: 360, height: 640 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

function BaseProviders({ children, extraProviders = [] }: ProvidersProps) {
  let tree = (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <PaperProvider theme={DefaultTheme}>{children}</PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );

  for (const wrap of extraProviders) {
    tree = wrap(tree);
  }

  return tree;
}

export function renderWithProviders(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper"> & { extraProviders?: ProvidersProps["extraProviders"] },
) {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <BaseProviders extraProviders={options?.extraProviders}>{children}</BaseProviders>
  );
  return render(ui, { wrapper: Wrapper, ...options });
}
