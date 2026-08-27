/**
 * サイト全体で統一するサービス定義（単一ソース）。
 * 別名で同じ概念を並べないこと。
 */
export const offerings = [
  {
    id: 'adoption',
    number: '01',
    title: '生成AI導入・活用支援',
    shortTitle: '導入・活用支援',
    navDescription: 'Copilot・Geminiの導入、研修、活用テーマの選定',
    description:
      'CopilotやGeminiを、実際の業務で使える状態へ。研修、業務棚卸し、テーマ選定、推進人材の育成まで対応します。',
    points: [
      'Microsoft 365 Copilot活用支援',
      'Google Workspace with Gemini活用支援',
      '生成AI研修・実践ワークショップ',
      '業務棚卸し・活用テーマ発掘',
      '導入ロードマップ策定',
      '推進担当者・社内人材の育成',
    ],
    href: '/service/ai-solution#adoption',
    tone: 'green' as const,
    /** 旧アンカー互換 */
    legacyIds: ['roadmap', 'training'] as const,
  },
  {
    id: 'build',
    number: '02',
    title: 'AIエージェント開発',
    shortTitle: 'AIエージェント開発',
    navDescription: '個社業務に合わせたAI・システムの実装',
    description:
      '標準機能では足りない業務を、AIエージェントや業務システムとして実装します。',
    points: [
      '文書確認・照合AI',
      '社内ナレッジ検索・RAG',
      '技術継承・問い合わせ対応AI',
      'AIエージェント開発',
      '点検・見積・承認・報告・請求業務のシステム化',
      '既存システム・社内データとの連携',
    ],
    href: '/service/ai-solution#build',
    tone: 'amber' as const,
    legacyIds: [] as const,
  },
  {
    id: 'operation',
    number: '03',
    title: '定着支援',
    shortTitle: '定着支援',
    navDescription: '利用状況の確認と、活用範囲の拡大',
    description:
      '導入後も利用状況と精度を確認し、活用範囲を広げます。',
    points: [
      '利用状況の分析',
      'AIの回答精度評価',
      'プロンプト・指示文の改善',
      'ナレッジ・データの更新',
      '新しい活用テーマの追加',
      '社内相談会・定例会',
      '他部門・全社への横展開',
      'ガバナンス・権限管理の支援',
    ],
    href: '/service/ai-solution#operation',
    tone: 'blue' as const,
    legacyIds: ['improve'] as const,
  },
] as const

export type OfferingId = (typeof offerings)[number]['id']

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

export const focusIndustries = [
  {
    id: 'manufacturing',
    title: '製造・化学',
    items: ['技術文書', '研究開発', '社内ナレッジ', '報告・確認業務', 'Copilot・Geminiの全社活用'],
  },
  {
    id: 'construction',
    title: '建設・設備・保守',
    items: ['点検', '見積', '修繕', '報告', '請求', '進捗管理'],
  },
] as const

export const supportMethod = {
  heading: '現場に入り、実装まで進める伴走型支援',
  body: '提案や開発だけで終わらず、業務理解から実装・定着まで現場に入って進めます。',
  features: [
    '業務理解から始める',
    '研修と実装を分断しない',
    'AIと業務システムの両方に対応する',
    '導入後も利用状況を確認する',
    'フィードバックをもとに改善する',
  ],
} as const
