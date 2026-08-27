/**
 * コーポレートサイトの title / description / OG を一箇所で揃える。
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.amber-inc.com'

export const siteMetadata = {
  name: '株式会社Amber',
  tagline: 'Technology for Essential Industries.',
  description:
    '暮らしを支える産業に、最新のテクノロジーを。製造・設備・建設・物流など、社会を支える産業の変革をAIとソフトウェアで実装する株式会社Amber。',
  defaultTitle: '株式会社Amber | Technology for Essential Industries.',
  keywords: [
    '株式会社Amber',
    '松井歩武',
    'Essential Industries',
    '業務変革',
    'AIエージェント',
    '業務システム',
    'データ連携',
    '製造',
    '設備保守',
    '建設',
    '物流',
  ] as const,
} as const
