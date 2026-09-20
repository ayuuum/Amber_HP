# 株式会社Amber コーポレートサイト

株式会社Amberのコーポレートサイトです。ブランドメッセージは **Technology for Essential Industries.** です。

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **コンテンツ**: Markdown（`content/blog/`）+ 管理画面
- **デプロイ**: Vercel
- **問い合わせ連携**: Notion / Supabase / Resend / CSO Agent（任意）

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local` を作成し、少なくとも以下を設定してください。

```env
NEXT_PUBLIC_SITE_URL=https://www.amber-inc.com
ADMIN_PASSWORD=your-strong-admin-password
# 任意: Cookie署名用（未設定時は ADMIN_PASSWORD を使用）
ADMIN_SESSION_SECRET=your-long-random-secret

# お問い合わせ（使うものだけ）
NOTION_TOKEN=
NOTION_CONTACT_DATABASE_ID=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
CONTACT_EMAIL=ayumu.matsui@amber-inc.com
CSO_AGENT_URL=
CSO_AGENT_SECRET=
CSO_AGENT_ANON_KEY=
```

`ADMIN_PASSWORD` は **8文字以上** 必須です。未設定や `admin123` では管理ログインできません。

### 3. 開発サーバーの起動

```bash
npm run dev
```

既定ポートは **3020** です（`http://localhost:3020`）。

## デプロイ

1. Vercel にプロジェクトをインポート
2. 上記の環境変数を設定（特に `ADMIN_PASSWORD` / `NEXT_PUBLIC_SITE_URL`）
3. デプロイ

## コーポレート運用

ニュース更新頻度、問い合わせ KPI、リリース前チェックは [docs/corporate-ops-kpi.md](docs/corporate-ops-kpi.md) を参照してください。

お問い合わせフローの詳細は [docs/contact-form-cso-agent.md](docs/contact-form-cso-agent.md) を参照してください。

## プロジェクト構造

```
├── app/
│   ├── api/
│   │   ├── contact/           # お問い合わせAPI
│   │   └── admin/             # 管理API（Cookie認証必須）
│   ├── service/
│   │   ├── ai-solution/       # サービス本体
│   │   ├── ai-training/       # 研修LP・記事
│   │   └── development/blog/  # 記事（個別URL。一覧は /blog へ集約）
│   ├── blog/                  # Insights 一覧
│   ├── legal/tokushoho/       # 特定商取引法に基づく表記
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── home/                  # トップセクション
│   ├── Header.tsx / Footer.tsx
│   └── admin/
├── content/blog/
│   ├── development/
│   └── training/
├── data/                      # ページコピー・サービス定義
└── lib/
    ├── markdown.ts
    ├── admin-auth.ts
    └── contact-delivery.ts
```

## ブログ

### 管理画面

1. `/admin/login` にアクセス
2. `ADMIN_PASSWORD` でログイン（HttpOnly Cookie セッション）
3. 記事の作成・編集・削除、画像アップロード

### Markdown 直接追加

`content/blog/development/` または `content/blog/training/` に `.md` を追加します。

```markdown
---
title: "記事タイトル"
description: "記事の説明"
date: "2026-01-15"
category: "development"  # development | training
keywords: ["キーワード1", "キーワード2"]
---

# 記事本文
```

### URL

- 一覧: `/blog`（`?category=development|training` で絞り込み）
- 個別: `/service/development/blog/{slug}` または `/service/ai-training/blog/{slug}`
- 旧一覧 URL は `/blog` へ 301 リダイレクト

## ライセンス

© 2026 株式会社Amber. All rights reserved.
