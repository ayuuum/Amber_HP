# 株式会社Amber コーポレートサイト

株式会社Amberのコーポレートサイトです。Next.js、TypeScript、Tailwind CSS、microCMSを使用して構築されています。

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **CMS**: microCMS
- **デプロイ**: Vercel

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local`ファイルを作成し、以下の環境変数を設定してください：

```env
NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN=your-service-domain
NEXT_PUBLIC_MICROCMS_API_KEY=your-api-key
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて確認してください。

## デプロイ

### Vercelへのデプロイ

1. [Vercel](https://vercel.com)にプロジェクトをインポート
2. 環境変数を設定：
   - `NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN`
   - `NEXT_PUBLIC_MICROCMS_API_KEY`
3. デプロイを実行

## microCMSの設定

### 必要なAPIエンドポイント

1. **contact** - お問い合わせフォーム用
   - フィールド：
     - name (テキスト)
     - company (テキスト)
     - email (テキスト)
     - phone (テキスト)
     - inquiryType (テキスト)
     - message (テキスト)

## プロジェクト構造

```
├── app/
│   ├── api/
│   │   └── contact/        # お問い合わせAPI
│   ├── globals.css         # グローバルスタイル
│   ├── layout.tsx          # ルートレイアウト
│   └── page.tsx            # トップページ
├── components/
│   ├── sections/           # 各セクションコンポーネント
│   ├── Header.tsx          # ヘッダー
│   └── Footer.tsx          # フッター
├── lib/
│   └── microcms.ts        # microCMSクライアント
└── public/                # 静的ファイル
```

## カラーパレット

- **Warm Cream**: `#F5EEDF`
- **Deep Forest Green**: `#1F3326`
- **Espresso Brown**: `#3A2A1F`
- **Warm Amber**: `#C49A6C`
- **Stone Gray**: `#E3E0D6`

## ライセンス

© 2024 株式会社Amber. All rights reserved.

