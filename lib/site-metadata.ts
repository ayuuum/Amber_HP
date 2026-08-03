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
    '企業の生成AI活用を、導入から業務実装・運用改善まで支援。Microsoft 365 Copilot・Google Workspace with Gemini対応、AIエージェント・業務システム開発まで。株式会社Amber公式サイト。',
  /** ルート相当のデフォルト title */
  defaultTitle: '株式会社Amber | AI活用を、現場の成果に。',
  keywords: [
    '株式会社Amber',
    '松井歩武',
    '生成AI導入・活用支援',
    'AIエージェント・業務システム開発',
    'AI定着・運用改善',
    'Microsoft 365 Copilot',
    'Google Workspace Gemini',
    '生成AI研修',
    '現場伴走',
  ] as const,
} as const
