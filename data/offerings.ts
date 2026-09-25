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
      '現場の業務・制約を起点に、AIとソフトウェア前提で業務の流れを再設計し、着手テーマと推進体制まで整えます。',
    points: [
      '業務棚卸し・課題の可視化',
      '業務フローの再設計',
      '着手テーマの選定',
      '推進体制・役割の設計',
      '定着・組織展開の計画',
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
      '現場で使われるAIエージェントや業務アプリケーションを設計・開発し、既存の業務フローへ組み込みます。',
    points: [
      '業務実行を支援するAIエージェント',
      '現場向け業務アプリケーション',
      'ナレッジ・検索の仕組み',
      '業務プロセスの自動化',
      '既存フローへの組み込み設計',
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
      '分断されたデータとシステムをつなぎ、業務全体がつながる状態と、改善が回る仕組みをつくります。',
    points: [
      'データ連携の設計・実装',
      '既存システム・API接続',
      '情報の横断的な見える化',
      '利用状況の可視化',
      '改善サイクルの設計',
    ],
    href: '/service/ai-solution#operation',
    tone: 'blue' as const,
    legacyIds: ['improve'] as const,
  },
] as const

export type OfferingId = (typeof offerings)[number]['id']

/** 下層・SEO用。TOPでは前面に出さない。実装するプラットフォーム面。 */
export const environments = [
  {
    id: 'copilot',
    title: 'Microsoft 365',
    items: [
      'Microsoft 365 Copilot',
      'Copilot Studio / Agent',
      'SharePoint・社内データ連携',
      'Power Automate / Power Apps',
      '権限設計・全社展開',
    ],
  },
  {
    id: 'gemini',
    title: 'Google Workspace',
    items: [
      'Gemini for Google Workspace',
      'Gmail / Docs / Sheets / Slides',
      'NotebookLM',
      'Gems・業務アシスタント',
      'Apps Script / Google Cloud',
    ],
  },
  {
    id: 'custom',
    title: 'Custom Stack',
    items: [
      '独自AIエージェント基盤',
      'RAG・社内検索基盤',
      '既存業務システムとの接続',
      '社内API・データ基盤',
      'Microsoft × Google 横断環境',
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
  heading: '現場に入り、実装まで進める。',
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
