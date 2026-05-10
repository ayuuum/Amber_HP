import type { ToolLPData } from '../types'

export const claudeCodeData: ToolLPData = {
  slug: 'claude-code',
  toolName: 'Claude Code',
  toolBadge: 'Anthropic',
  tagline: 'コードを書かなくても、業務をAIエージェントに任せる',
  heroDescription:
    'AIエージェント「Claude Code」をビジネス職が業務で活用できる法人研修です。提案書・調査レポート・データ整理・社内ツール作成まで、プログラミング不要で自動化できる状態を2コース×10時間で実現します。',
  envLabel: 'Claude Code / Anthropic',

  problems: [
    {
      label: 'パターン 01',
      title: 'ChatGPTの「貼り付け→コピー」作業に限界を感じている',
      desc: 'ChatGPT でテキストを生成しても、ファイルの読み込み・保存・繰り返し処理は手作業のまま。Claude Code はファイル操作からタスク実行まで一気通貫で動くため、手作業を大幅に減らせます。',
    },
    {
      label: 'パターン 02',
      title: '自動化したいが、プログラミングを覚える時間がない',
      desc: '「Excel マクロや Python を学べば楽になる」と分かっていても、習得コストが高くて手が出せません。Claude Code なら自然言語の指示だけで処理を組み立てられます。',
    },
    {
      label: 'パターン 03',
      title: 'IT部門に頼まずに部門専用の仕組みを作れない',
      desc: '社内申請・レポート集計・議事録整理など、IT部門に依頼するほどではないが地味に時間がかかる作業が積み上がっています。ビジネス職自身が自動化できれば、待ち時間ゼロで解決できます。',
    },
  ],

  basicCourse: {
    target: '全ビジネス職（営業・マーケ・企画・管理部門）',
    items: [
      'Claude Code のセットアップと基本操作（コマンドライン不要）',
      '提案書・調査レポート・議事録の自動生成',
      'CSV・Excel データの整理・集計・可視化',
      'Web 検索・情報収集・要約の自動化',
      '繰り返し業務をファイルごと一括処理する方法',
    ],
    outcome:
      '自分の業務フローに合わせた Claude Code 操作手順書と、すぐ使えるプロンプトテンプレート集。研修終了時に各自の手元で動く状態でお渡しします。',
  },

  advancedCourse: {
    target: 'DX推進・部門リーダー・業務改善担当',
    items: [
      '複数ファイル・複数ステップの業務フロー自動化',
      '社内データ（議事録・報告書・顧客情報）の構造化と活用',
      'Slack・Google Drive・Notion などの外部ツールと連携',
      'IT部門不要の「部門専用 AI ワークフロー」設計',
      '全社展開に向けたルール整備とナレッジ共有の仕組み',
    ],
    outcome:
      '部門の実業務で動く AI ワークフロー。研修終了時に「明日から使える」状態でお渡しします。',
  },

  relatedTools: [
    { label: 'ChatGPT 法人研修', href: '/service/ai-training/chatgpt' },
    { label: 'Microsoft 365 Copilot 法人研修', href: '/service/ai-training/copilot' },
    { label: 'Gemini for Workspace 法人研修', href: '/service/ai-training/gemini' },
  ],

  metaTitle: 'Claude Code 法人研修（ビジネス職向け）| コードなしで業務を自動化 | 株式会社Amber',
  metaDescription:
    'プログラミング不要でAIエージェントを業務に活用するClaude Code法人研修。提案書・データ整理・レポート自動化から部門ワークフロー構築まで、2コース×10時間で対応。人材開発支援助成金の対象となり得ます。',
  metaKeywords: [
    'Claude Code 法人研修',
    'Claude Code ビジネス活用',
    'AIエージェント 業務自動化 研修',
    'Anthropic Claude 研修',
    'ノーコード AI 業務効率化',
    '生成AI 法人研修 ビジネス職',
    'AI 業務改善 研修',
  ],
  accentRgb: '192 106 79',
}
