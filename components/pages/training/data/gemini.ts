import type { ToolLPData } from '../types'

export const geminiData: ToolLPData = {
  slug: 'gemini',
  toolName: 'Gemini for Workspace',
  toolBadge: 'Google',
  tagline: 'Workspaceに眠る情報資産を、Geminiで使い切る',
  heroDescription:
    'Google Workspace（Docs／Sheets／Slides／Gmail／Meet）に組み込まれたGeminiを、全社員が使いこなせる状態にします。NotebookLM・Gems・Deep Researchを組織で活用するところまで、2コース×10時間で対応します。',
  envLabel: 'Google Workspace',

  problems: [
    {
      label: 'パターン 01',
      title: 'ライセンスはあるが、社員が使い方を知らない',
      desc: 'Gemini for Workspace のライセンスは契約済みでも、Docs・Sheets・Gmail それぞれでの呼び出し方や得意分野が周知されておらず、活用が一部社員に偏っています。',
    },
    {
      label: 'パターン 02',
      title: 'NotebookLM／Gems が個人利用に留まっている',
      desc: '社内資料を集約した NotebookLM や、業務向けに作った Gems が個人の手元に閉じてしまい、組織のナレッジ資産として運用されていません。',
    },
    {
      label: 'パターン 03',
      title: 'Deep Research や Gemini Live を業務に組み込めない',
      desc: '機能としては知っていても、実際の意思決定プロセスや会議・商談プロセスにどう組み込むかの設計ができず、機能が「知っているだけ」で終わっています。',
    },
  ],

  basicCourse: {
    target: '全社員',
    items: [
      'Docs／Sheets／Slides／Gmail／Meet での Gemini 活用',
      'NotebookLM での社内ナレッジ集約と検索',
      'Gems を使った業務向けカスタムAI構築',
      'Deep Research による情報収集・調査',
      '自社業務向けプロンプト設計と共有',
    ],
    outcome:
      '自社業務向けの Gems と NotebookLM、Workspace 内 Gemini プロンプト集。研修終了時に各自の手元で即使える状態でお渡しします。',
  },

  advancedCourse: {
    target: 'DX推進・情シス・部門リーダー',
    items: [
      '組織共有 Gems の設計・運用とガバナンス',
      'Apps Script ＋ Gemini API による業務自動化',
      'Vertex AI Agent Builder でのエージェント構築',
      'Gemini Live を活用した会議・商談プロセス再設計',
      'Workspace 全社展開ロードマップ設計',
    ],
    outcome:
      '組織で運用可能な Gems と業務自動化フロー。研修終了時に実際に動く状態でお渡しします。',
  },

  relatedTools: [
    { label: 'Microsoft 365 Copilot 法人研修', href: '/service/ai-training/copilot' },
    { label: 'ChatGPT 法人研修', href: '/service/ai-training/chatgpt' },
    { label: 'AIエージェント構築', href: '/service/ai-solution#stages' },
  ],

  metaTitle: 'Gemini for Workspace 法人研修 | Workspaceの情報資産をGeminiで使い切る | 株式会社Amber',
  metaDescription:
    'Google Workspace の Gemini・NotebookLM・Gems・Deep Research を全社で活用する法人研修。Vertex AI Agent Builder でのエージェント構築まで、2コース×10時間で対応。人材開発支援助成金の対象となり得ます。',
  metaKeywords: [
    'Gemini 法人研修',
    'Gemini for Workspace 研修',
    'Google Workspace 生成AI研修',
    'NotebookLM 研修',
    'Gems 研修',
    'Vertex AI Agent Builder 研修',
    '法人研修 AI Google',
  ],
  accentRgb: '61 107 171',
}
