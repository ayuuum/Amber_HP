import { aiSolutionAssets } from '@/lib/ai-solution-assets'

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
  body: '研修だけで終わらせない。業務設計からAI研修、エージェント・システム開発、定着支援まで。Amberは現場に入り、使われ続ける仕組みを実装します。',
  primaryCta: 'AI活用を相談する',
  secondaryCta: '支援内容を見る',
  secondaryHref: '#capabilities',
} as const

export const heroConversation = {
  userLabel: '利用者',
  userMessage: '報告書の確認に、毎回2時間かかっています。',
  aiLabel: 'Amber AI',
  aiMessage: '確認観点を標準化しました。抜け漏れと修正候補を確認します。',
  status: [
    { label: '確認完了', value: '12件' },
    { label: '要確認', value: '2件' },
  ],
} as const

export const proofItems = [
  { value: '30社以上', label: '法人向け生成AI研修' },
  { value: '継続支援', label: '大手企業への複数月の伴走' },
  { value: '一気通貫', label: '研修から開発・定着まで' },
  { value: '現場産業', label: '製造・化学・設備での支援' },
] as const

export const valueBento = {
  headingLines: ['AIを導入するだけでなく、', '成果が出るところまで。'] as const,
  lead: 'Amberは、ツールの導入や単発研修では終わりません。業務に組み込み、現場で使われ、改善が続く状態をつくります。',
  featured: {
    title: 'AI活用を、業務成果につなげる',
    description: '経営課題と現場業務を整理し、効果と実現性の高いテーマから実装します。',
    tone: 'green' as const,
  },
  cards: [
    {
      title: '現場が使える状態をつくる',
      description: '自社業務を題材に、研修・演習・実務適用まで設計します。',
      tone: 'blue' as const,
    },
    {
      title: '個社業務に合わせて実装する',
      description: 'AIエージェント、業務システム、既存環境との連携まで対応します。',
      tone: 'amber' as const,
    },
    {
      title: '導入後も改善し続ける',
      description: '現場での利用状況を見ながら、ルール・プロンプト・システムを改善します。',
      tone: 'gray' as const,
    },
  ],
} as const

export type HomeCase = {
  industry: string
  challenge: string
  support: string
  change: string
  before: string
  after: string
  image: string
  imageAlt: string
  href: string
}

export const homeCases: HomeCase[] = [
  {
    industry: '素材・化学',
    challenge: '研究・現場部門でAI活用度にばらつきがあり、全社で使える状態になっていなかった。',
    support: '業務棚卸しから内製化プログラムを設計し、部門横断のAI標準化を推進。',
    change: '研究と現場で、同じAIの使い方が回る状態へ。',
    before: '部門ごとの活用度にばらつき',
    after: '部門横断のAI標準化',
    image: aiSolutionAssets.cases.chemical,
    imageAlt: '素材・化学業界の支援イメージ',
    href: '/service/ai-solution',
  },
  {
    industry: '消防設備点検',
    challenge: '紙の点検報告とスケジュール管理が手戻りを生んでいた。',
    support: '点検報告とスケジュール管理のデジタル化、業務フローの再設計。',
    change: '現場の手戻りを減らし、デジタル業務フローへ移行。',
    before: '紙の帳票・スケジュール',
    after: 'デジタル業務フロー',
    image: aiSolutionAssets.cases.fire,
    imageAlt: '消防設備点検業の支援イメージ',
    href: '/service/ai-solution',
  },
  {
    industry: 'ハウスクリーニング',
    challenge: '店舗ごとに予約・配車・顧客管理が分断されていた。',
    support: '複数店舗を横断できる業務台帳・運用設計を支援。',
    change: '1つの業務OSで全店舗を横断管理できる状態へ。',
    before: '店舗ごとに分断された管理',
    after: '横断管理できる業務OS',
    image: aiSolutionAssets.cases.cleaning,
    imageAlt: 'ハウスクリーニング業の支援イメージ',
    href: '/service/ai-solution',
  },
]

export const axProcess = {
  headingLines: ['構想から定着まで、', 'ひとつのチームで。'] as const,
  lead: '研修、コンサルティング、開発を分断せず、現場で成果が出るまで一貫して支援します。',
  stages: [
    {
      id: 'discover',
      label: 'Discover',
      title: '発見・構想',
      items: ['業務ヒアリング', 'AI活用テーマの整理', '優先順位とロードマップ'],
    },
    {
      id: 'enable',
      label: 'Enable',
      title: '研修・内製化',
      items: ['生成AI研修', '業務別ワークショップ', '推進人材の育成'],
    },
    {
      id: 'build',
      label: 'Build',
      title: '実装',
      items: ['AIエージェント', '業務システム', 'データ・既存システム連携'],
    },
    {
      id: 'scale',
      label: 'Scale',
      title: '定着・展開',
      items: ['利用定着', '効果測定', '部門展開・全社展開'],
    },
  ],
} as const

export const capabilities = [
  {
    id: 'roadmap',
    title: 'AI活用ロードマップ',
    description: '経営・業務課題からAI活用の優先順位を設計し、実装可能な計画に落とし込みます。',
    href: '/service/ai-solution',
  },
  {
    id: 'training',
    title: '生成AI研修・内製化',
    description: '自社業務を題材に、現場で使える状態をつくる研修と内製化支援を行います。',
    href: '/service/ai-solution',
  },
  {
    id: 'build',
    title: 'AIエージェント・システム開発',
    description: '個社業務に合わせたAIと業務システムを、既存環境と連携して実装します。',
    href: '/service/ai-solution',
  },
  {
    id: 'fde',
    title: 'FDE・継続改善',
    description: '現場に入り、利用定着と改善を継続支援します。',
    href: '/#ax-process',
  },
] as const

export const trustPrinciples = [
  {
    title: '既存のIT環境とルールを前提に設計',
    description: '新しいツールを押し付けるのではなく、現場の環境と運用に合わせて設計します。',
  },
  {
    title: '機密情報・権限・データ管理を考慮',
    description: '扱う情報の範囲と権限を整理し、安全に使える形で進めます。',
  },
  {
    title: '人による確認を含む安全な業務フロー',
    description: '自動化だけに頼らず、確認・承認を組み込んだ流れを設計します。',
  },
  {
    title: '導入後の改善と運用まで支援',
    description: '導入して終わりにせず、使われ続ける状態まで伴走します。',
  },
] as const

export const finalCta = {
  headingLines: ['自社のAI活用を、', 'どこから始めるべきか。'] as const,
  body: '業務課題や現在の取り組みを伺い、最初に着手すべきテーマと進め方を一緒に整理します。',
  cta: 'AI活用の進め方を相談する',
} as const

export const serviceMegaMenu = [
  {
    title: 'AI活用ロードマップ',
    description: '経営・業務課題からAI活用の優先順位を設計',
    href: '/#capabilities',
  },
  {
    title: '生成AI研修・内製化支援',
    description: '自社業務を題材に、現場で使える状態をつくる',
    href: '/service/ai-solution',
  },
  {
    title: 'AIエージェント・システム開発',
    description: '個社業務に合わせたAIと業務システムを実装',
    href: '/service/ai-solution',
  },
  {
    title: 'FDE・継続改善',
    description: '現場に入り、利用定着と改善を継続支援',
    href: '/#ax-process',
  },
] as const

export const navItems = [
  { label: 'サービス', href: '#', mega: true },
  { label: '支援事例', href: '/#cases' },
  { label: '会社情報', href: '/company' },
  { label: '知見', href: '/blog' },
] as const

export const brandTagline = '企業のAI活用を、現場の成果に。'
