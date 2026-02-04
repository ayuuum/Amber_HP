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
NEXT_PUBLIC_SITE_URL=https://www.amber-inc.com
ADMIN_PASSWORD=your-admin-password
CONTACT_FORM_WEBHOOK_URL=https://script.google.com/macros/s/xxxxx/exec
```

**お問い合わせフォーム（Google Sheets + メール通知）** を使う場合は、`CONTACT_FORM_WEBHOOK_URL` に Google Apps Script の Web アプリ URL を設定してください。セットアップ手順は [docs/contact-form-gas-setup.md](docs/contact-form-gas-setup.md) を参照してください。

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
   - `NEXT_PUBLIC_SITE_URL`
   - `ADMIN_PASSWORD`（管理画面のパスワード）
   - `CONTACT_FORM_WEBHOOK_URL`（お問い合わせフォーム用・[セットアップ手順](docs/contact-form-gas-setup.md)参照）
3. デプロイを実行

## microCMSの設定

ブログ・コンテンツ用の API エンドポイントを設定してください。

## お問い合わせフォーム（Google Sheets + メール通知）

お問い合わせは **Google Apps Script** で Google スプレッドシートに保存し、メール通知を受け取る構成です。無料で利用できます。手順は [docs/contact-form-gas-setup.md](docs/contact-form-gas-setup.md) を参照してください。

## プロジェクト構造

```
├── app/
│   ├── api/
│   │   └── contact/        # お問い合わせAPI
│   ├── service/
│   │   ├── consulting/
│   │   │   └── blog/       # AI顧問サービス向けブログ
│   │   ├── training/
│   │   │   └── blog/       # 生成AI研修向けブログ
│   │   └── saas/
│   │       └── blog/       # Vertical SaaS向けブログ
│   ├── globals.css         # グローバルスタイル
│   ├── layout.tsx          # ルートレイアウト
│   └── page.tsx            # トップページ
├── components/
│   ├── sections/           # 各セクションコンポーネント
│   ├── Header.tsx          # ヘッダー
│   └── Footer.tsx          # フッター
├── content/
│   └── blog/              # ブログ記事（Markdown）
│       ├── consulting/    # AI顧問サービス向け記事
│       ├── training/      # 生成AI研修向け記事
│       └── saas/          # Vertical SaaS向け記事
├── lib/
│   ├── microcms.ts        # microCMSクライアント
│   └── markdown.ts        # Markdownパース用ユーティリティ
└── public/                # 静的ファイル
```

## ブログ機能

### ブログ記事の投稿方法

ブログ記事は以下の2つの方法で追加できます：

#### 方法1: 管理画面から追加（推奨）

1. `/admin/login` にアクセス
2. 環境変数 `ADMIN_PASSWORD` で設定したパスワードでログイン
3. 「新規作成」ボタンから記事を作成
4. タイトル、カテゴリ、説明、本文などを入力
5. 画像は「画像アップロード」ボタンからアップロード可能
6. プレビュー機能で確認してから保存

#### 方法2: エディタから直接追加

1. `content/blog/`ディレクトリ内の該当カテゴリフォルダにMarkdownファイルを作成
2. フロントマターにメタデータを記述
3. 記事本文をMarkdown形式で記述
4. ビルド時に自動的にページが生成されます

**注意**: 管理画面とエディタの両方から追加できますが、管理画面で作成した記事もMarkdownファイルとして保存されます。

### 記事のフロントマター例

```markdown
---
title: "記事タイトル"
description: "記事の説明"
date: "2026-01-15"
category: "consulting"  # consulting, training, saas のいずれか
keywords: ["キーワード1", "キーワード2"]
---

# 記事本文
```

### ブログのURL構造

- AI顧問サービス向けブログ一覧: `/service/consulting/blog`
- 生成AI研修向けブログ一覧: `/service/training/blog`
- Vertical SaaS向けブログ一覧: `/service/saas/blog`
- 個別記事: `/service/{category}/blog/{slug}`

## カラーパレット

- **Warm Cream**: `#F5EEDF`
- **Deep Forest Green**: `#1F3326`
- **Espresso Brown**: `#3A2A1F`
- **Warm Amber**: `#C49A6C`
- **Stone Gray**: `#E3E0D6`

## ライセンス

© 2026 株式会社Amber. All rights reserved.

