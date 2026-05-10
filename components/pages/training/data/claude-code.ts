import type { ToolLPData } from '../types'

export const claudeCodeData: ToolLPData = {
  slug: 'claude-code',
  toolName: 'Claude Code',
  toolBadge: 'Anthropic',
  tagline: 'エンジニア組織の開発生産性を、AI前提で再設計する',
  heroDescription:
    'ClaudeをCLIで直接操作するAIコーディングエージェント「Claude Code」を、開発組織全体に定着させる法人研修です。個人利用から組織運用まで、2コース×10時間で対応します。',
  envLabel: 'Claude Code / Anthropic',

  problems: [
    {
      label: 'パターン 01',
      title: '個人が使い始めたが、組織ルールが整っていない',
      desc: '意識の高いエンジニアが個人で Claude Code を使い始めても、CLAUDE.md の設計・セキュリティポリシー・機密情報の取り扱いルールが整っておらず、組織展開できていません。',
    },
    {
      label: 'パターン 02',
      title: 'コードレビュー・ドキュメント生成の品質がばらつく',
      desc: '使い方が属人化すると、Claude Code で生成するコードやドキュメントの品質が個人差で大きくぶれます。組織として水準を揃える仕組みが必要です。',
    },
    {
      label: 'パターン 03',
      title: 'エージェント化・MCP連携のノウハウがない',
      desc: 'Claude Agent SDK や MCP サーバーを活用したカスタムエージェント構築に興味はあるが、実践的なノウハウを持つ人材がいません。',
    },
  ],

  basicCourse: {
    target: '全エンジニア・テックリード',
    items: [
      'Claude Code のインストール・基本操作',
      'CLAUDE.md の設計とリポジトリへの組み込み',
      'コードレビュー・リファクタリング・バグ修正への活用',
      'テスト生成・ドキュメント自動化',
      '組織セキュリティポリシーと Claude Code の両立',
    ],
    outcome:
      '自社リポジトリ用 CLAUDE.md と Claude Code 運用ルールセット。研修終了時にチーム全体で使える状態でお渡しします。',
  },

  advancedCourse: {
    target: 'テックリード・エンジニアリングマネージャー',
    items: [
      'Claude Agent SDK を使ったカスタムエージェント構築',
      'MCP（Model Context Protocol）サーバーの設計と実装',
      'CI/CD パイプラインへの Claude Code 組み込み',
      'サブエージェントを使った並列タスク自動化',
      '組織向け Claude Code 運用・ガバナンス設計',
    ],
    outcome:
      '自社業務で動くカスタムエージェントと MCP サーバー。研修終了時に組織で即運用できる状態でお渡しします。',
  },

  relatedTools: [
    { label: 'Microsoft 365 Copilot 法人研修', href: '/service/ai-training/copilot' },
    { label: 'Cursor 法人研修', href: '/service/ai-training#courses' },
    { label: 'AIエージェント構築研修', href: '/service/ai-training#courses' },
  ],

  metaTitle: 'Claude Code 法人研修 | エンジニア組織のAI活用を組織化 | 株式会社Amber',
  metaDescription:
    'Claude Code を開発組織全体に定着させる法人研修。CLAUDE.md 設計から Claude Agent SDK・MCP サーバー構築まで、2コース×10時間で対応。人材開発支援助成金の対象となり得ます。',
  metaKeywords: [
    'Claude Code 法人研修',
    'Claude Code 研修',
    'Anthropic 研修',
    'AIコーディング研修',
    'エンジニア AI研修',
    'Claude Agent SDK 研修',
    'MCP サーバー研修',
  ],
  accentRgb: '192 106 79',
}
