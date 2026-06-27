export const contactInquiryTypes = [
  'development',
  'training',
  'pine',
  'demo',
  'partnership',
  'recruiting',
  'general',
] as const

export type ContactInquiryType = (typeof contactInquiryTypes)[number]

export type ContactPreset = {
  inquiryType: ContactInquiryType
  message: string
}

export const contactInquiryLabels: Record<ContactInquiryType, string> = {
  development: 'AIシステム開発・業務改善',
  training: '生成AI活用研修',
  pine: 'Pine導入相談',
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
  development: {
    inquiryType: 'development',
    message: 'AIシステム開発・業務改善について相談したいです。\n\n現在の課題：\n相談したい業務：\n希望時期：\n',
  },
  training: {
    inquiryType: 'training',
    message: '生成AI活用研修について相談したいです。\n\n対象人数：\n利用中のAIツール：\n相談したい内容：\n',
  },
  pine: {
    inquiryType: 'pine',
    message: 'Pineの導入について相談したいです。\n\n業種：\n店舗数・拠点数：\n現在の予約管理方法：\n',
  },
  copilot: {
    inquiryType: 'training',
    message: 'Microsoft 365 Copilot研修について相談したいです。\n\n対象人数：\n現在のMicrosoft 365利用状況：\n相談したい内容：\n',
  },
  chatgpt: {
    inquiryType: 'training',
    message: 'ChatGPT法人研修について相談したいです。\n\n対象人数：\n現在のChatGPT利用状況：\n相談したい内容：\n',
  },
  gemini: {
    inquiryType: 'training',
    message: 'Gemini for Workspace研修について相談したいです。\n\n対象人数：\n現在のGoogle Workspace利用状況：\n相談したい内容：\n',
  },
  'claude-code': {
    inquiryType: 'training',
    message: 'Claude Code研修について相談したいです。\n\n対象部署：\n自動化したい業務：\n相談したい内容：\n',
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
  return `/company${query ? `?${query}` : ''}#contact`
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
  return contactInquiryTypes.includes(value as ContactInquiryType)
    ? (value as ContactInquiryType)
    : null
}
