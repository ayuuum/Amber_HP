# 真っ白画面の予防（運用メモ）

## よくある原因

1. **Framer Motion**  
   親の `variants` で `opacity: 0` を付けたまま、`animate="visible"` が子に伝わらず透明のまま固まる。  
   → 親は **`lib/motion-safe.ts` の `staggerContainer`** のように **opacity をいじらない**。フェードは子の `fadeUpItem` のみ。

2. **App Router の `<head>`**  
   ルート `layout` で手書きの `<head>` を置くと、Next が注入する CSS リンクと衝突し、スタイルが載らない。  
   → **`<body>` 内に JSON-LD 等を置く**（現状どおり）。

3. **未デプロイ・未ビルドの変更**  
   → PR 時に **`npm run build` が通る CI**（`.github/workflows/ci.yml`）で検知。

4. **ルート全体のクラッシュ**  
   → **`app/global-error.tsx`** で CSS に依存しない最小 UI を表示（完全な真っ白を避ける）。

## 新規でヒーロー／大枠アニメを足すとき

- ページ全体を包む `motion` に **`hidden: { opacity: 0 }` を付けない**。
- どうしても親でフェードする場合は **`initial={false}`** や **`animate` の伝播**を必ず確認し、実機でリロード検証する。
