export const contactInquiryTypes = [
  'ai-solution',
  'development',
  'training',
  'pine',
  'fire-ops',
  'demo',
  'partnership',
  'recruiting',
  'general',
] as const

export type ContactInquiryType = (typeof contactInquiryTypes)[number]

/** お問い合わせフォームに表示する種別（レガシー development / training は除外） */
export const contactFormInquiryTypes = [
  'ai-solution',
  'pine',
  'fire-ops',
  'demo',
  'partnership',
  'recruiting',
  'general',
] as const satisfies readonly ContactInquiryType[]

export type ContactPreset = {
  inquiryType: ContactInquiryType
  message: string
}

export const contactInquiryLabels: Record<ContactInquiryType, string> = {
  'ai-solution': '業務変革・AI実装',
  development: 'AI・業務システムの設計開発',
  training: '生成AI研修',
  pine: 'Pine導入相談',
  'fire-ops': '消防設備・点検補修案件管理',
  demo: 'デモ・資料請求',
  partnership: '業務提携・投資・出資',
  recruiting: '採用・参画',
  general: 'その他・一般的なお問い合わせ',
}

const sourceMessages: Record<string, ContactPreset> = {
  hero: {
    inquiryType: 'general',
    message: 'Amberのサービスについて相談したいです。\n\n相談したい内容：\n',
  },
  'header-cta': {
    inquiryType: 'general',
    message: 'Amberのサービスについて相談したいです。\n\n相談したい内容：\n',
  },
  'home-forest-cta': {
    inquiryType: 'general',
    message: 'Amberのサービスについて相談したいです。\n\n相談したい内容：\n',
  },
  'home-hero': {
    inquiryType: 'ai-solution',
    message:
      'Technology for Essential Industries.について相談したいです。\n\n現在の課題：\n対象業界・業務：\n希望時期：\n',
  },
  'home-final-cta': {
    inquiryType: 'ai-solution',
    message:
      '業務変革・AI実装の進め方について相談したいです。\n\n現在の取り組み：\n相談したい業務課題：\n希望時期：\n',
  },
  'contact-cta': {
    inquiryType: 'ai-solution',
    message: '業務変革・AI実装について相談したいです。\n\n現在の課題：\n相談したい内容：\n',
  },
  'ai-solution-final': {
    inquiryType: 'ai-solution',
    message:
      '業務変革・AI実装の進め方について相談したいです。\n\n現在の課題：\n対象部署：\n希望時期：\n',
  },
  roadmap: {
    inquiryType: 'ai-solution',
    message:
      '業務変革・AI実装について相談したいです。\n\n現在の課題：\n対象部署・業務：\n希望時期：\n',
  },
  company: {
    inquiryType: 'general',
    message: 'Amberへの相談・協業について連絡したいです。\n\n内容：\n',
  },
  blog: {
    inquiryType: 'ai-solution',
    message: '自社業務へのテクノロジー実装について相談したいです。\n\n相談したい内容：\n',
  },
  'ai-solution': {
    inquiryType: 'ai-solution',
    message:
      '業務変革・AI実装について相談したいです。\n\n現在の課題：\n対象部署・業務：\n希望時期：\n',
  },
  development: {
    inquiryType: 'ai-solution',
    message:
      'AI & Software / Data & Integration について相談したいです。\n\n現在の課題：\n相談したい業務：\n希望時期：\n',
  },
  training: {
    inquiryType: 'training',
    message:
      '生成AI研修について相談したいです。\n\n対象人数：\n利用中のAIツール：\n相談したい内容：\n',
  },
  pine: {
    inquiryType: 'pine',
    message: 'Pineの導入について相談したいです。\n\n業種：\n店舗数・拠点数：\n現在の予約管理方法：\n',
  },
  'fire-ops': {
    inquiryType: 'fire-ops',
    message:
      '消防設備会社向け 点検・補修案件管理について相談したいです。\n\n現在の管理方法：\n止まりやすい工程：\n相談したい内容：\n',
  },
  'fire-ops-consultation': {
    inquiryType: 'fire-ops',
    message:
      '消防設備・点検補修案件管理について、30分の相談を希望します。\n\n現在の課題：\n利用中のツール：\n希望時期：\n',
  },
  'fire-ops-diagnosis': {
    inquiryType: 'fire-ops',
    message: '消防設備・点検補修案件の業務診断を依頼します。\n',
  },
  copilot: {
    inquiryType: 'ai-solution',
    message: 'Microsoft 365 Copilot研修について相談したいです。\n\n対象人数：\n現在のMicrosoft 365利用状況：\n相談したい内容：\n',
  },
  chatgpt: {
    inquiryType: 'ai-solution',
    message: 'ChatGPT法人研修について相談したいです。\n\n対象人数：\n現在のChatGPT利用状況：\n相談したい内容：\n',
  },
  gemini: {
    inquiryType: 'ai-solution',
    message: 'Gemini for Workspace研修について相談したいです。\n\n対象人数：\n現在のGoogle Workspace利用状況：\n相談したい内容：\n',
  },
  'claude-code': {
    inquiryType: 'ai-solution',
    message: 'Claude Code研修について相談したいです。\n\n対象部署：\n自動化したい業務：\n相談したい内容：\n',
  },
  'blog-fsa-basics': {
    inquiryType: 'demo',
    message: '現場自動化パイロット開始前チェックリストを希望します。\n\n対象業務：\n拠点数・現場数：\n',
  },
  'blog-fsa-playbook': {
    inquiryType: 'demo',
    message: '現場DX導入前の設計シートを希望します。\n\n対象業務：\n現状のツール：\n',
  },
  'blog-fsa-compare': {
    inquiryType: 'ai-solution',
    message: '現場向けソフト（SaaSと業務基盤）の選び方について30分相談したいです。\n\n現状：\n比較中の選択肢：\n',
  },
  'blog-fsa-pilot': {
    inquiryType: 'demo',
    message: '現場自動化の2週間パイロットについて相談したいです。\n\n対象チーム：\n見たいKPI：\n希望時期：\n',
  },
  'blog-fsa-case': {
    inquiryType: 'ai-solution',
    message: '訪問・現場業務の統合事例についてヒアリングしたいです。\n\n業種：\n近い課題：\n',
  },
  'blog-di-patterns': {
    inquiryType: 'demo',
    message: 'データ連携パターン早見表を希望します。\n\nつなぎたいシステム：\n',
  },
  'blog-di-legacy': {
    inquiryType: 'ai-solution',
    message: 'レガシーとクラウド連携の構成について壁打ちしたいです。\n\n現行システム：\n制約：\n',
  },
  'blog-di-rag': {
    inquiryType: 'ai-solution',
    message: '社内文書RAGの対象範囲について技術相談したいです。\n\n文書の種類：\n利用者：\n',
  },
  'blog-di-partner': {
    inquiryType: 'ai-solution',
    message: 'データ連携の見積もり・範囲整理を相談したいです。\n\n連携したいシステム：\n希望時期：\n',
  },
  'blog-di-case': {
    inquiryType: 'ai-solution',
    message: '点検・予約・顧客データの連携事例に近い相談をしたいです。\n\n現状：\n',
  },
  'blog-agent-basics': {
    inquiryType: 'demo',
    message: '業務AIエージェント適性チェックリストを希望します。\n\n対象業務：\n',
  },
  'blog-agent-arch': {
    inquiryType: 'ai-solution',
    message: 'エージェントのツール・権限・監査設計をレビューしてほしいです。\n\n想定ユースケース：\n',
  },
  'blog-agent-gov': {
    inquiryType: 'demo',
    message: 'AIエージェントガバナンス10項目チェックを希望します。\n\n推進部署：\n',
  },
  'blog-agent-partner': {
    inquiryType: 'ai-solution',
    message: 'AIエージェント実装パートナーの比較軸を整理したいです。\n\n要件：\n',
  },
  'blog-agent-pilot': {
    inquiryType: 'demo',
    message: '現場オペ向けエージェントパイロットのデモ／相談を希望します。\n\n対象業務：\n希望時期：\n',
  },
  'blog-cm-basics': {
    inquiryType: 'demo',
    message: 'AI導入・現場定着チェックリストを希望します。\n\n対象組織：\n',
  },
  'blog-cm-playbook': {
    inquiryType: 'demo',
    message: 'デジタル定着プレイブックを希望します。\n\n導入予定の仕組み：\n',
  },
  'blog-cm-training': {
    inquiryType: 'demo',
    message: '新ソフト研修計画テンプレを希望します。\n\n対象人数：\n導入ソフト：\n',
  },
  'blog-cm-partner': {
    inquiryType: 'ai-solution',
    message: '定着ワークショップ（ロールアウト伴走）を相談したいです。\n\n対象部署：\n希望時期：\n',
  },
  'blog-cm-case': {
    inquiryType: 'ai-solution',
    message: '部門横断のAI定着プログラムについて相談したいです。\n\n組織規模：\n課題：\n',
  },
  'blog-cs-howto': {
    inquiryType: 'demo',
    message: 'DX事例のKPI見方ガイドを希望します。\n\n比較したい領域：\n',
  },
  'blog-cs-procurement': {
    inquiryType: 'demo',
    message: '調達向け・AI導入事例比較チェックシートを希望します。\n\n調達フェーズ：\n',
  },
  'blog-cs-types': {
    inquiryType: 'ai-solution',
    message: '自社に近い事例類型の照合を相談したいです。\n\n業種：\n課題：\n',
  },
  'blog-cs-fire': {
    inquiryType: 'demo',
    message: '消防設備点検の業務基盤事例について詳細を聞きたいです。\n\n近い業務：\n',
  },
  'blog-cs-request': {
    inquiryType: 'demo',
    message: '事例ヒアリング／デモを依頼します。\n\n関心のある事例：\n社内の決裁タイミング：\n',
  },
  footer: {
    inquiryType: 'general',
    message: 'Amberについて連絡したいです。\n\n内容：\n',
  },
}

export function buildContactHref(source: string, inquiry?: ContactInquiryType) {
  const params = new URLSearchParams()
  if (source) {
    params.set('source', source)
  }
  if (inquiry) {
    params.set('inquiry', inquiry)
  }

  const query = params.toString()
  return `/contact${query ? `?${query}` : ''}`
}

export function getContactPreset(source: string | null, inquiry: string | null): ContactPreset {
  const preset = source ? sourceMessages[source] : null
  const parsedInquiry = parseContactInquiryType(inquiry)

  if (preset && parsedInquiry) {
    return { ...preset, inquiryType: parsedInquiry }
  }
  if (preset) {
    return preset
  }
  if (parsedInquiry) {
    return {
      inquiryType: parsedInquiry,
      message: `${contactInquiryLabels[parsedInquiry]}について相談したいです。\n\n相談したい内容：\n`,
    }
  }

  return {
    inquiryType: 'general',
    message: '',
  }
}

export function parseContactInquiryType(value: string | null | undefined): ContactInquiryType | null {
  if (!value) {
    return null
  }
  if (value === 'development' || value === 'training') {
    return 'ai-solution'
  }
  return contactInquiryTypes.includes(value as ContactInquiryType)
    ? (value as ContactInquiryType)
    : null
}
