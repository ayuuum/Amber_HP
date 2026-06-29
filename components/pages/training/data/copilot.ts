import type { ToolLPData } from '../types'

export const copilotData: ToolLPData = {
  slug: 'copilot',
  toolName: 'Microsoft 365 Copilot',
  toolBadge: 'Microsoft 環境',
  tagline: 'ライセンスを、現場の生産性に変える',
  heroDescription:
    'Word・Excel・PowerPoint・Teams・Outlookに組み込まれたCopilotを、全社員が業務で使いこなせる状態にします。Copilot Studioによるエージェント構築まで、2コース×10時間で対応。',
  envLabel: 'Microsoft 365',

  problems: [
    {
      label: 'パターン 01',
      title: 'ライセンスを払って、使っていない',
      desc: 'Microsoft 365 CopilotはユーザーあたりM365上乗せで高額です。配布しただけで活用が進まず、コスト回収できていないケースが大多数です。',
    },
    {
      label: 'パターン 02',
      title: 'アプリごとに操作が違って混乱する',
      desc: 'WordのCopilot、ExcelのCopilot、TeamsのCopilot…それぞれUIと使い方が異なり、社員が把握できないまま放置されます。',
    },
    {
      label: 'パターン 03',
      title: 'Copilot Studioで何を作れば良いか分からない',
      desc: 'エージェント機能に興味はあるが、自社業務に何をどう自動化すべきかの整理ができず、IT部門だけで抱え込んでいます。',
    },
  ],

  basicCourse: {
    target: '全社員',
    items: [
      'Word／Excel／PowerPoint への Copilot 組み込み',
      'Teams 会議の自動要約・議事録生成',
      'Outlook メール下書き・返信補助',
      '自社業務向けプロンプト設計',
      'Microsoft 365 Chat（旧 Copilot for Microsoft 365）活用',
    ],
    outcome:
      '自社業務に直結した Copilot プロンプト集。研修終了時に各自の手元で即使える状態でお渡しします。',
  },

  advancedCourse: {
    target: 'DX推進・情シス・部門リーダー',
    items: [
      'Copilot Studio でのエージェント設計と構築',
      'SharePoint・Teams・業務システムとの連携',
      'Power Automate を使った業務フロー自動化',
      'ガバナンス設計と全社展開ロードマップ',
      '運用・メンテナンス体制の構築',
    ],
    outcome:
      '自社業務で動く Copilot Studio エージェント。研修終了時、組織で即運用できる状態でお渡しします。',
  },

  relatedTools: [
    { label: 'ChatGPT 法人研修', href: '/service/ai-training/chatgpt' },
    { label: 'Gemini for Workspace 法人研修', href: '/service/ai-training/gemini' },
    { label: 'AIエージェント構築', href: '/service/ai-solution#stages' },
  ],

  metaTitle: 'Microsoft 365 Copilot 法人研修 | ライセンスを現場の生産性に変える | 株式会社Amber',
  metaDescription:
    'Microsoft 365 Copilot（Word・Excel・PowerPoint・Teams・Outlook）を全社員が使いこなせる状態にする法人研修。Copilot Studio でのエージェント構築まで、2コース×10時間で対応。人材開発支援助成金の対象となり得ます。',
  metaKeywords: [
    'Microsoft 365 Copilot 法人研修',
    'Copilot 研修',
    'M365 Copilot 研修',
    'Copilot Studio 研修',
    '生成AI研修 Microsoft',
    '法人研修 AI',
  ],
  accentRgb: '31 111 168',
}
