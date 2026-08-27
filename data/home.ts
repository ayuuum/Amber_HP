/** ヒーローメディア。動画は muted + playsInline で自動再生。動きを減らす設定時はポスター画像。 */
export const heroMedia = {
  videoSrc: '',
  poster: '/images/brand/hero-figma.jpg',
  image: '/images/brand/hero-figma.jpg',
  imageAlt: '霧に包まれた森と山並み',
} as const

export const heroCopy = {
  headingLines: ['生成AIを', '現場の成果に。'] as const,
  body: '導入から定着まで、現場で使えるAI活用を支援します。',
  primaryCta: '相談する',
  secondaryCta: 'サービスを見る',
  secondaryHref: '#services',
} as const

export const servicesSection = {
  heading: '導入から実装〜定着まで',
  lead: '活用テーマの発掘から実装・改善まで、一つのチームで進めます。',
} as const

export const environmentsSection = {
  heading: '対応できる業務環境',
  lead: '企業の業務効率化を支援するための、主要なAIプラットフォームと既存システムへの対応をご紹介します。',
} as const

export const domainsSection = {
  heading: '具体的な業務へ実装します',
  lead: '文書確認、ナレッジ、現場業務など、成果が見える領域から着手します。',
} as const

export const casesSection = {
  heading: '支援事例',
  lead: '守秘のため企業名は非公開です。取り組みの一例です。',
} as const

export const industriesSection = {
  heading: '現場業務を持つ企業を中心に',
  lead: '製造・化学、建設・設備・保守など。',
} as const

export const finalCta = {
  headingLines: ['生成AIを、', '業務で使える状態へ'] as const,
  body: '現状に合わせて、進め方をご提案します。',
  cta: '相談する',
} as const

export const brandTagline = '生成AI活用を、導入から定着まで。'
