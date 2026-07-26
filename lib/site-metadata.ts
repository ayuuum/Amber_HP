/**
 * コーポレートサイトの title / description / OG を一箇所で揃える。
 * 変更時はここを更新し、layout・各ページの metadata・StructuredData と整合させる。
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.amber-inc.com'

export const siteMetadata = {
  name: '株式会社Amber',
  /** ミッション（短いタグライン） */
  tagline: 'AI活用を、現場の成果に。',
  /** 検索・OG 用の説明文 */
  description:
    '企業のAI活用を、構想・業務設計・研修・開発・定着まで一気通貫で支援するAXパートナー。株式会社Amber公式サイト。',
  /** ルート相当のデフォルト title */
  defaultTitle: '株式会社Amber | AI活用を、現場の成果に。',
  keywords: [
    '株式会社Amber',
    '松井歩武',
    'AI活用・実装支援',
    'AI活用実行ロードマップ',
    '生成AI研修',
    'AIエージェント',
    '業務システム開発',
    '現場伴走',
    'FDE',
    '内製化',
  ] as const,
} as const
