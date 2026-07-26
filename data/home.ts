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
  demoLabel: '活用イメージ',
  userLabel: '利用者',
  userMessage: '報告書の確認に、毎回2時間かかっています。',
  aiLabel: '業務確認エージェント',
  aiMessage: '確認観点を標準化しました。抜け漏れと修正候補を確認します。',
  status: [
    { label: '確認完了', value: '12件' },
    { label: '要確認', value: '2件' },
  ],
  statusNote: 'デモ表示',
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
  cards: [
    {
      id: 'roadmap',
      label: 'AI活用戦略・ロードマップ',
      title: '取り組むべきAI活用を明確にする',
      description: '経営課題と現場業務を整理し、効果と実現性の高いテーマに優先順位をつけます。',
      entryLabel: 'まずはこちらから' as string | null,
      tone: 'green' as const,
      visual: 'priority' as const,
    },
    {
      id: 'enable',
      label: 'AI人材育成・業務定着',
      title: '現場で使われる状態をつくる',
      description: '自社業務を題材に、研修・演習・実務適用まで一貫して支援します。',
      entryLabel: null,
      tone: 'blue' as const,
      visual: 'enablement' as const,
    },
    {
      id: 'build',
      label: 'AIエージェント・システム開発',
      title: '自社の業務に合わせて実装する',
      description: 'AIエージェントや業務システムの開発から、既存環境との連携まで対応します。',
      entryLabel: null,
      tone: 'amber' as const,
      visual: 'agent' as const,
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
    change: '予約・配車・顧客情報を横断して把握できる状態へ。',
    before: '店舗ごとに分断された管理',
    after: '複数店舗の横断管理',
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
      label: '発見・構想',
      title: '発見・構想',
      items: ['業務ヒアリング', 'AI活用テーマの整理', '優先順位と実行ロードマップ'],
    },
    {
      id: 'enable',
      label: '人材育成・定着',
      title: '人材育成・業務定着',
      items: ['生成AI研修', '業務別ワークショップ', '推進人材の育成'],
    },
    {
      id: 'build',
      label: '実装',
      title: 'エージェント・システム開発',
      items: ['AIエージェント', '業務システム', 'データ・既存システム連携'],
    },
    {
      id: 'scale',
      label: '定着・展開',
      title: '定着・継続改善',
      items: ['利用定着', '効果測定', '部門展開・全社展開'],
    },
  ],
} as const

export const capabilitiesSection = {
  headingLines: ['構想から人材育成、', 'システム実装まで。'] as const,
  lead: 'AI活用の優先順位を定め、社員が使える状態をつくり、必要な仕組みを実装する。Amberは3つの支援を組み合わせ、AI活用を現場の成果につなげます。',
  entryHeading: '何から始めるべきか分からない企業へ',
  entryBody:
    'まずはAI活用実行ロードマップを通じて、対象業務、期待効果、優先順位、実行方法を整理します。',
  entryCta: 'AI活用ロードマップについて相談する',
} as const

export const capabilities = [
  {
    id: 'roadmap',
    number: '01',
    title: 'AI活用戦略・ロードマップ',
    description: '経営課題と現場業務を整理し、AIを活用すべき業務、優先順位、実行方法を明確にします。',
    points: ['業務・課題の整理', 'AI活用テーマの抽出', '優先順位付け', '実行ロードマップ策定'],
    href: '/service/ai-solution#roadmap',
    entryLabel: 'まずはこちらから' as string | null,
    tone: 'green' as const,
  },
  {
    id: 'training',
    number: '02',
    title: 'AI人材育成・業務定着',
    description: '研修だけで終わらせず、社員が自分の業務でAIを使い、活用を継続できる状態をつくります。',
    points: ['生成AI研修', '業務別ワークショップ', 'AIエージェント内製化', '活用ルール・定着支援'],
    href: '/service/ai-solution#training',
    entryLabel: null,
    tone: 'blue' as const,
  },
  {
    id: 'build',
    number: '03',
    title: 'AIエージェント・システム開発',
    description: '既存ツールでは解決できない個社固有の業務に合わせ、AIエージェントや業務システムを設計・開発します。',
    points: ['AIエージェント開発', '業務システム開発', '既存システム・データ連携', '導入後の改善'],
    href: '/service/ai-solution#build',
    entryLabel: null,
    tone: 'amber' as const,
  },
] as const

export const fdeStyle = {
  label: 'FDE / 現場伴走型支援',
  heading: '現場に入り、実装と改善を前に進める。',
  body: 'Amberのエンジニアが顧客の現場に入り、業務理解から設計、開発、導入後の改善まで伴走します。要件が固まったシステムを開発するだけでなく、現場と一緒に『何をつくるべきか』から検証します。',
  note: '戦略策定・人材育成・システム開発の各フェーズに対応',
  spans: ['AI活用戦略・ロードマップ', 'AI人材育成・業務定着', 'AIエージェント・システム開発'],
} as const

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

export const brandTagline = '企業のAI活用を、現場の成果に。'
