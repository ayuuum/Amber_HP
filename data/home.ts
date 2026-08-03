/** ヒーローメディア。動画追加時は src にパスを入れ、poster を指定する */
export const heroMedia = {
  /** 例: '/videos/amber-hero-01.mp4' — 未配置のため null */
  videoSrc: null as string | null,
  poster: '/images/brand/consulting-split.png',
  image: '/images/brand/consulting-split.png',
  imageAlt: '整理された作業現場。窓から光が差し込む倉庫・作業スペース',
} as const

export const heroCopy = {
  headingLines: ['AI活用を、', '現場の成果に。'] as const,
  body: 'Copilot・Geminiの導入から、AIエージェント・業務システムの開発、定着まで。企業の業務にAIを実装し、現場で使われ続ける状態をつくります。',
  primaryCta: '生成AI活用について相談する',
  secondaryCta: 'サービスを見る',
  secondaryHref: '#services',
  highlights: [
    'Copilot対応',
    'Gemini対応',
    'AI開発',
    '定着・運用改善',
  ] as const,
} as const

export const proofItems = [
  { value: '30社以上', label: '法人向け生成AI研修・支援実績' },
  { value: '継続支援', label: '大手企業への複数月の伴走' },
  { value: '現場業務', label: '製造・化学・設備などへの支援実績' },
] as const

export const servicesSection = {
  heading: '生成AIの導入から、業務実装、運用改善まで',
  lead: 'ツールの使い方を教えるだけではなく、活用テーマの発掘、業務への実装、導入後の改善まで一つのチームで進めます。',
} as const

export const environmentsSection = {
  heading: 'お客様の業務環境に合わせて支援します',
  lead: 'CopilotとGeminiは独立した事業ではなく、Amberが対応できる業務環境です。',
} as const

export const domainsSection = {
  heading: 'AIを、具体的な業務へ実装します',
  lead: '抽象的なAI活用ではなく、文書確認・ナレッジ・現場業務など、成果が見える領域から実装します。',
} as const

export const casesSection = {
  heading: '支援事例',
  lead: '守秘義務により企業名は非公開です。業界と支援内容をもとに、取り組みの一例をご紹介します。',
} as const

export const industriesSection = {
  heading: '現場業務を持つ企業を中心に支援しています',
  lead: 'サービス分類とは別に、特に支援実績のある業界です。',
} as const

export const finalCta = {
  headingLines: ['生成AIを、', '実際の業務で使える状態へ'] as const,
  body: '研修から始めたい場合も、具体的な業務をAI化したい場合も、現在の状況に合わせて進め方をご提案します。',
  cta: '生成AI活用について相談する',
} as const

export const brandTagline = '企業の生成AI活用を、導入から業務実装・運用改善まで。'
