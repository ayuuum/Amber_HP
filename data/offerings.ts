/**
 * サイト全体で統一するサービス定義（単一ソース）。
 * AI・研修・開発は手段。向き合うのは Essential Industries。
 */
export const offerings = [
  {
    id: 'adoption',
    number: '01',
    title: 'Business Transformation',
    shortTitle: '業務変革・業務設計',
    navDescription: '業務を理解し、AIとソフトウェア前提で再設計する',
    description:
      '現場の業務、システム、データ、課題を整理し、AIとソフトウェアを前提に業務の流れそのものを再設計します。',
    points: [
      '業務棚卸し・課題整理',
      '業務フローの再設計',
      '活用テーマの選定',
      '推進体制の設計',
      '組織展開の計画',
    ],
    href: '/service/ai-solution#adoption',
    tone: 'green' as const,
    legacyIds: ['roadmap', 'training'] as const,
  },
  {
    id: 'build',
    number: '02',
    title: 'AI & Software',
    shortTitle: 'AI・業務システムの設計開発',
    navDescription: 'AIエージェントや業務システムを設計・開発する',
    description:
      'AIエージェントや業務システム、既存システム連携を設計・開発し、現場の業務に組み込みます。',
    points: [
      'AIエージェント開発',
      '業務システム開発',
      'ナレッジ・検索基盤',
      'ワークフロー自動化',
      '既存システム連携',
    ],
    href: '/service/ai-solution#build',
    tone: 'amber' as const,
    legacyIds: [] as const,
  },
  {
    id: 'operation',
    number: '03',
    title: 'Data & Integration',
    shortTitle: 'データ・既存システム連携',
    navDescription: '分断されたデータとシステムをつなぐ',
    description:
      '分断されたデータ・システムを連携し、業務全体がつながる基盤をつくります。',
    points: [
      'データ連携設計',
      'API・既存システム接続',
      '情報の横断管理',
      '利用状況の可視化',
      '改善サイクルの設計',
    ],
    href: '/service/ai-solution#operation',
    tone: 'blue' as const,
    legacyIds: ['improve'] as const,
  },
] as const

export type OfferingId = (typeof offerings)[number]['id']

/** 下層・SEO用。TOPでは前面に出さない。 */
export const environments = [
  {
    id: 'copilot',
    title: 'Microsoft 365 Copilot',
    items: [
      'Copilot活用研修',
      'Copilot Agent構築',
      'SharePointや社内データの活用',
      'Power Automate・Power Appsとの連携',
      '大規模導入・全社展開支援',
    ],
  },
  {
    id: 'gemini',
    title: 'Google Workspace with Gemini',
    items: [
      'Gemini活用研修',
      'Gmail、Docs、Sheets、Slidesでの業務活用',
      'NotebookLM活用',
      'Gems・業務アシスタントの構築',
      'Apps ScriptやGoogle Cloudとの連携',
    ],
  },
  {
    id: 'custom',
    title: 'オーダーメイド',
    items: [
      '独自AIエージェント',
      'RAG・社内検索',
      '業務システム開発',
      'API・既存データとの連携',
      'MicrosoftとGoogleをまたぐ業務設計',
    ],
  },
] as const

export const focusIndustries = [
  {
    id: 'manufacturing',
    enTitle: 'Manufacturing',
    title: '製造・素材・化学',
    description: '技術文書、研究開発、ナレッジ、報告・確認業務など。',
  },
  {
    id: 'field-services',
    enTitle: 'Field Services',
    title: '設備・保守・点検',
    description: '点検、修繕、報告、スケジュールなど現場オペレーション。',
  },
  {
    id: 'construction',
    enTitle: 'Construction',
    title: '建設・施工',
    description: '進捗管理、報告、見積、現場と事務の情報連携。',
  },
  {
    id: 'infrastructure',
    enTitle: 'Infrastructure & Logistics',
    title: '物流・社会インフラ',
    description: '分断されたデータと業務をつなぎ、運用の基盤をつくる。',
  },
] as const

export const whatWeDoSteps = [
  {
    number: '01',
    enTitle: 'Understand',
    title: '業務を理解する',
    body: '現場の業務、システム、データ、課題を整理する。',
  },
  {
    number: '02',
    enTitle: 'Redesign',
    title: '業務を再設計する',
    body: 'AIとソフトウェアを前提に、業務の流れそのものを再設計する。',
  },
  {
    number: '03',
    enTitle: 'Build',
    title: '実装する',
    body: 'AIエージェントや業務システム、既存システム連携を設計・開発する。',
  },
  {
    number: '04',
    enTitle: 'Scale',
    title: '定着・展開する',
    body: '実際の業務に組み込み、改善しながら組織へ展開する。',
  },
] as const

export const whatWeBuildItems = [
  {
    enTitle: 'AI Agents',
    title: '業務を実行・支援するAIエージェント',
  },
  {
    enTitle: 'Business Applications',
    title: '現場に合わせた業務システム',
  },
  {
    enTitle: 'Knowledge Systems',
    title: '社内の知識・情報を活用する仕組み',
  },
  {
    enTitle: 'Workflow Automation',
    title: '複雑な業務プロセスの自動化',
  },
  {
    enTitle: 'Data Integration',
    title: '分断されたデータ・システムの連携',
  },
] as const

export const realOperationFlow = [
  { en: 'Inspection', ja: '点検' },
  { en: 'Decision', ja: '判断・承認' },
  { en: 'Repair', ja: '修繕' },
  { en: 'Reporting', ja: '報告' },
  { en: 'Billing', ja: '請求' },
] as const

export const howWeWorkPrinciples = [
  {
    enTitle: 'Start from the Field.',
    title: '現場から始める。',
  },
  {
    enTitle: 'Build, Don’t Just Advise.',
    title: '提案だけで終わらせない。',
  },
  {
    enTitle: 'Integrate, Don’t Add.',
    title: 'ツールを増やすのではなく、業務に組み込む。',
  },
  {
    enTitle: 'Learn and Compound.',
    title: '現場で得た知見を、次の実装へつなげる。',
  },
] as const

/** @deprecated TOPでは How we work を使用。下層互換用。 */
export const supportMethod = {
  heading: 'Built with the Field.',
  body: '提案や開発だけで終わらず、業務理解から実装まで現場に入って進めます。',
  features: howWeWorkPrinciples.map((p) => p.title),
} as const

/** @deprecated TOPでは What we build を使用。 */
export const implementationDomains = [
  {
    id: 'documents',
    title: '文書・確認業務',
    items: ['書類の照合', '不備検知', '報告書作成', '技術文書レビュー', '規程・ルールの確認'],
  },
  {
    id: 'knowledge',
    title: 'ナレッジ・技術継承',
    items: ['社内文書検索', '過去事例検索', '技術問い合わせ対応', 'ベテラン知識の蓄積', 'マニュアル生成'],
  },
  {
    id: 'field',
    title: '現場業務',
    items: ['点検', '見積', '承認', '修繕管理', '報告', '請求', '進捗・遅延管理'],
  },
] as const
