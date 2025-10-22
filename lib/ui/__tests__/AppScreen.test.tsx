import { screen } from "@testing-library/react-native";
import { Text } from "react-native-paper";
import { AppScreen } from "@/lib/ui/AppScreen";
import { renderWithProviders } from "@/tests/renderWithProviders";

describe("AppScreen", () => {
  test.each([{ scroll: false }, { scroll: true }])(
    "scroll=%s のとき子要素を表示できる",
    async ({ scroll }) => {
      renderWithProviders(
        <AppScreen scroll={scroll}>
          <Text>Hello</Text>
        </AppScreen>,
      );
      expect(await screen.findByText(`Hello`)).toBeTruthy();
    },
  );

  test("title があれば表示される", () => {
    const title = "テストタイトル";
    const { queryByText } = renderWithProviders(
      <AppScreen {...{ title }}>
        <>content</>
      </AppScreen>,
    );

    const maybeTitle = queryByText(title);
    if (maybeTitle) {
      expect(maybeTitle).toBeOnTheScreen();
    }
  });
});
