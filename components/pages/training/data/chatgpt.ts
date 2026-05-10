import type { ToolLPData } from '../types'

export const chatgptData: ToolLPData = {
  slug: 'chatgpt',
  toolName: 'ChatGPT',
  toolBadge: 'OpenAI',
  tagline: '配って終わりにしない、ChatGPT研修',
  heroDescription:
    'ChatGPT Team／Business／Enterpriseの導入後、組織に定着させるための法人研修です。Custom GPTs構築から ChatGPT Agentまで、全社員とDX推進層それぞれに最適な2コース×10時間で対応します。',
  envLabel: 'ChatGPT / OpenAI',

  problems: [
    {
      label: 'パターン 01',
      title: 'アカウントを配っただけで誰も使っていない',
      desc: 'ChatGPT Teamのライセンスを全社に配布しても、日常業務での使い方が分からず、数週間で開かなくなります。',
    },
    {
      label: 'パターン 02',
      title: '社員によって使い方がバラバラ',
      desc: '意欲的な社員だけが活用し、活用していない社員との生産性格差が拡大。組織としての底上げが全くできていない状態です。',
    },
    {
      label: 'パターン 03',
      title: 'Custom GPTsを作っても組織で共有できない',
      desc: '個人で Custom GPTs を作っても、チーム・部門で活用する仕組みがなく、属人化したまま個人の資産で終わります。',
    },
  ],

  basicCourse: {
    target: '全社員',
    items: [
      '主要 AI ツール（ChatGPT・Claude・Gemini）の使い分け',
      'プロンプト設計と業務文書（提案書・議事録・メール）への応用',
      'Custom GPTs の構築と組織共有',
      'ChatGPT Projects を使った情報整理',
      '情報収集・分析・データ可視化',
    ],
    outcome:
      '自社業務向けプロンプトテンプレート集と Custom GPTs。研修終了時、組織で共有できる状態でお渡しします。',
  },

  advancedCourse: {
    target: 'DX推進・部門リーダー・経営層',
    items: [
      'ChatGPT Agent を使ったタスク自動化',
      '組織共有 Custom GPTs の設計・構築・運用',
      '業務プロセスの AI 前提での再設計',
      'Advanced Data Analysis による業務データ分析',
      'OpenAI API を活用した業務システム連携',
    ],
    outcome:
      '組織で運用可能な Custom GPTs と ChatGPT Agent ワークフロー。研修終了時に実際に動く状態でお渡しします。',
  },

  relatedTools: [
    { label: 'Microsoft 365 Copilot 法人研修', href: '/service/ai-training/copilot' },
    { label: 'Gemini for Workspace 法人研修', href: '/service/ai-training/gemini' },
    { label: 'Claude Code 法人研修', href: '/service/ai-training/claude-code' },
  ],

  metaTitle: 'ChatGPT 法人研修 | 配って終わりにしない、全社定着型 | 株式会社Amber',
  metaDescription:
    'ChatGPT Team／Enterprise 導入後の法人研修。Custom GPTs 構築から ChatGPT Agent まで、2コース×10時間で全社定着を実現。人材開発支援助成金の対象となり得ます。',
  metaKeywords: [
    'ChatGPT 法人研修',
    'ChatGPT 研修',
    'Custom GPTs 研修',
    'ChatGPT Team 研修',
    'ChatGPT Enterprise 研修',
    '生成AI 法人研修',
  ],
}
