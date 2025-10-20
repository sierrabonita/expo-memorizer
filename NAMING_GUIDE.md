# 🧭 Naming Guide

このプロジェクトでは、**役割と返り値の種類に応じて命名を統一**し、コードの可読性とメンテ性を高めることを目的とします。

---

## ✅ 関数命名ルール（役割ベース）

| 目的 / 返り値の性質                                 | 命名プレフィックス例                                      | 例                                                  |
|--------------------------------------------------|--------------------------------------------------------|-----------------------------------------------------|
| **UIイベント（副作用を伴う）**                       | `handleXxx`, `onXxx`, `runXxx`, `executeXxx`           | `handleSubmit`, `runDeleteFlow`                    |
| **ユースケース（アプリ層ロジック実行）**              | `useXxx`（React Hookとして実装）                      | `useUpdateQuestion`, `useDeleteQuestion`           |
| **オブジェクトや設定を生成（＝Factory）**             | `createXxx`, `buildXxx`, `makeXxx`, `xxxFactory`        | `createStylesFromTheme`, `makeQuestionDto`         |
| **boolean判定だけを返す**                           | `isXxx`, `canXxx`, `shouldXxx`                         | `isValidForm`, `shouldShowHint`                    |
| **文字列やフォーマット済み値を返す**                   | `formatXxx`, `toXxx`, `generateXxxText`                | `formatDate`, `toDisplayTitle`                     |
| **void関数（副作用専用）**                           | `handleXxx`, `applyXxx`, `execXxx`, `runXxx`           | `applyThemeOverrides`, `execMigration`             |

---

## 📌 Hook 命名ルール

| 目的                     | 命名                         | 例                                    |
|------------------------|----------------------------|--------------------------------------|
| **DB/ユースケース呼び出し**   | `useXxx`（動詞 + 対象）       | `useCreateQuestion`, `useListQuestions` |
| **ライフサイクル Hook**   | `useXxxEffect`, `useXxxOnFocus` | `useRefetchOnFocus`, `useInitDB`      |
| **ルートパラメータ適合**   | `useRouteXxx`               | `useRouteQuestionId`                 |
| **UI専用状態管理**        | `useXxxState`, `useXxxVisible` | `useSnackbarState`, etc             |

> ⚠ Hook ではないものに `useXxx` を付けない（ReactのHookルール違反）

---

## 🎨 コンポーネント命名（UI層）

| 種類 / 目的                                         | 命名パターン                       | 例                           |
|--------------------------------------------------|-------------------------------|------------------------------|
| **画面（Expo Routerのページ）**                    | `XxxScreen` / PascalCaseのみ      | `CreateQuestionScreen`      |
| **UI共通レイアウト / コンテナ**                    | `AppXxx`, `UiXxx`               | `AppTopBar`, `AppScreen`     |
| **プレゼンテーション（状態を持たないUIパーツ）**         | 名詞系 / `XxxView`               | `QuestionForm`, `QuestionRowView` |

---

## 🧩 Repository / UseCase 層 命名

| 層                 | 命名スタイル                               | 例                                     |
|------------------|-----------------------------------------|----------------------------------------|
| **Repository（DB層）** | `XxxRepository` / `useXxxRepository()` | `useQuestionsRepository()`            |
| **ユースケースHook**   | `useXxxQuestion()`（動詞付き）          | `useDeleteQuestion`, `useUpdateQuestion` |
| **将来のドメイン層**    | `IQuestionsRepo`, `QuestionEntity`      | DDD/Hex構成時に使用可能                |

---

## 🎯 判定フロー（迷ったら）

1. **返り値は何か？**
   - boolean → `isXxx`
   - オブジェクト・設定 → `createXxx` / `makeXxx`
   - 副作用のみ → `handleXxx` / `runXxx`

2. **目的はUIか、アプリロジックか？**
   - UIイベント → `handleXxx`
   - ユースケース（Hook） → `useXxx`
   - ルートパラメータ → `useRouteXxx`

3. **英語として自然か？**
   - ✅ `useDeleteQuestion` → 操作の意図が明確
   - 🚫 `doDelete`, `logicDelete` → 抽象的 / 目的語が不足

---

