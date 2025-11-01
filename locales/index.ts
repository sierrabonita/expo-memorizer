import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

// 当面は日本語のみ
// import en from "./en.json";
import ja from "./ja.json";

const i18n = new I18n({
  // en,
  ja,
});

// 端末ロケールを反映
const locales = Localization.getLocales();
i18n.locale = locales[0]?.languageCode ?? "en";

// フォールバック（未訳は英語に）
// i18n.enableFallback = true;

export function t(key: string, params?: Record<string, string | number>) {
  return i18n.t(key, params);
}

// 必要なら i18n を直接使いたい場面向けに公開
export { i18n };
