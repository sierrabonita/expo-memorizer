# テスト環境

このプロジェクトでは、Expo + Jest + Testing Library を使用して React Native コンポーネントをテストしています。

jest-expo をベースに、@testing-library/react-native と react-native-paper を組み合わせた構成です。

## 使用パッケージ

jest / jest-expo

@testing-library/react-native

@types/jest

biome（Lint / Formatter）

## ディレクトリ構成
```
tests/
├─ renderWithProviders.tsx   # Providerラッパ（SafeArea対応）
├─ jest.setup.ts             # Jestセットアップ
└─ expo-sqlite.ts            # SQLiteモック
```

## 実行方法
```
# すべてのテスト
npm test 

# 個別実行
npm test -- lib/ui/__tests__/AppScreen.test.tsx
or
npx jest lib/ui/__tests__/AppScreen.test.tsx

```

## 補足

SafeAreaProvider に initialMetrics を渡すことで Jest 環境でも描画可能。

tests/expo-sqlite.ts は expo-sqlite をメモリ上で再現した型安全モック。

findByText などの非同期マッチャを使用することで描画待ちが安定します。