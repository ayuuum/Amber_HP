/**
 * 法人連絡先・会社概要の単一ソース。
 * privacy / terms / tokushoho / StructuredData / company から参照する。
 */
export const companyInfo = {
  legalName: '株式会社Amber',
  legalNameEn: 'Amber Inc.',
  representativeName: '松井 歩武',
  representativeTitle: '代表取締役',
  foundedYear: '2026年1月',
  email: 'ayumu.matsui@amber-inc.com',
  phone: '080-3814-0263',
  phoneE164: '+81-80-3814-0263',
  postalCode: '105-0001',
  addressRegion: '東京都',
  addressLocality: '港区',
  streetAddress: '虎ノ門３丁目１−１ 2階',
  streetAddressAscii: '虎ノ門3丁目1-1 2階',
  fullAddress: '〒105-0001 東京都港区虎ノ門３丁目１−１ 2階',
  banks: 'GMOあおぞらネット銀行、三井住友銀行',
  businessDescription:
    'Essential Industries向けの業務変革、AI・業務システムの設計開発、データ・既存システム連携／プロダクト事業（訪問サービス向け業務管理「Pine」）',
  geo: {
    latitude: 35.6664,
    longitude: 139.7466,
  },
  openingHours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const,
    opens: '09:00',
    closes: '18:00',
  },
} as const
