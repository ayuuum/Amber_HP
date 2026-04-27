/**
 * コーポレートサイトの title / description / OG を一箇所で揃える。
 * 変更時はここを更新し、layout・各ページの metadata・StructuredData と整合させる。
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.amber-inc.com'

export const siteMetadata = {
  name: '株式会社Amber',
  /** ミッション（短いタグライン） */
  tagline: '暮らしを支える産業に、最新のテクノロジーを。',
  /** 検索・OG 用の説明文（デッキの事業定義と整合） */
  description:
    '東京都を拠点に、AI Solution（AI導入コンサルティング・AIシステム開発・生成AI活用研修）とAI SaaS（出張訪問向け予約管理「Pine」）を提供。現場の業務再設計から定着まで伴走します。株式会社Amber公式サイト。',
  /** ルート相当のデフォルト title */
  defaultTitle: '株式会社Amber | 暮らしを支える産業に、最新のテクノロジーを。',
  keywords: [
    '株式会社Amber',
    '松井歩武',
    'AI導入コンサルティング',
    'AIシステム開発',
    '生成AI研修',
    'Pine',
    'ホームサービス',
    '業務効率化',
    '中小企業',
  ] as const,
} as const
