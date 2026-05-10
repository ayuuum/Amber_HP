import type { ToolLPData } from '../types'

export const githubCopilotData: ToolLPData = {
  slug: 'github-copilot',
  toolName: 'GitHub Copilot',
  toolBadge: 'GitHub / Microsoft',
  tagline: 'サジェストを超えた、開発チームのAI活用へ',
  heroDescription:
    'GitHub Copilot Individual／Business／Enterpriseを、開発チーム全体で最大限活用するための法人研修です。インラインサジェストから Copilot Chat・Copilot Workspace まで、2コース×10時間で対応します。',
  envLabel: 'GitHub / VS Code',

  problems: [
    {
      label: 'パターン 01',
      title: 'サジェストを受け入れるだけで、深く使えていない',
      desc: 'GitHub Copilot を導入しても、インラインサジェストを受け入れるだけの使い方に留まり、Copilot Chat・テスト生成・ドキュメント自動化まで踏み込めていません。',
    },
    {
      label: 'パターン 02',
      title: 'セキュリティポリシーと使い方の両立ができていない',
      desc: '機密コードの取り扱い・パブリックコードの引用リスク・コンテンツ除外設定など、セキュリティ面の整備が追いつかず、組織利用に踏み切れていません。',
    },
    {
      label: 'パターン 03',
      title: 'エンジニアによって習熟度に大きな差がある',
      desc: '先端を走るエンジニアと、そうでないエンジニアの差が広がるばかりで、チームとしての開発速度が底上げされません。',
    },
  ],

  basicCourse: {
    target: '全エンジニア',
    items: [
      'GitHub Copilot のインラインサジェスト完全活用',
      'Copilot Chat による対話型コーディング支援',
      'テスト自動生成とカバレッジ向上',
      'PR レビュー・コード説明・ドキュメント生成',
      'コンテンツ除外・セキュリティ設定の実践',
    ],
    outcome:
      '自社リポジトリ用 `.github/copilot-instructions.md` と GitHub Copilot 利用ガイドライン。研修終了時にチームで使える状態でお渡しします。',
  },

  advancedCourse: {
    target: 'テックリード・エンジニアリングマネージャー',
    items: [
      'Copilot Workspace を使ったタスク駆動開発',
      'カスタムインストラクションの設計と運用',
      'GitHub Copilot Enterprise の組織設定とポリシー管理',
      'CI/CD への Copilot 活用組み込み',
      '開発チーム全体への展開ロードマップ設計',
    ],
    outcome:
      '組織向け GitHub Copilot 運用ポリシーと展開ロードマップ。研修終了時に即実行できる状態でお渡しします。',
  },

  relatedTools: [
    { label: 'Claude Code 法人研修', href: '/service/ai-training/claude-code' },
    { label: 'Cursor 法人研修', href: '/service/ai-training#courses' },
    { label: 'Microsoft 365 Copilot 法人研修', href: '/service/ai-training/copilot' },
  ],

  metaTitle: 'GitHub Copilot 法人研修 | 開発チーム全体のAI活用を底上げ | 株式会社Amber',
  metaDescription:
    'GitHub Copilot Individual／Business／Enterprise の法人研修。Copilot Chat・Workspace・セキュリティ設定まで、2コース×10時間でチーム全体を底上げ。人材開発支援助成金の対象となり得ます。',
  metaKeywords: [
    'GitHub Copilot 法人研修',
    'GitHub Copilot 研修',
    'Copilot 研修 エンジニア',
    'AIコーディング研修',
    'エンジニア AI研修',
    'GitHub Copilot Enterprise 研修',
  ],
}
