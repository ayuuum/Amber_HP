import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { companyInfo } from '@/lib/company-info'
import { siteUrl } from '@/lib/site-metadata'

export const metadata: Metadata = {
  title: '特定商取引法に基づく表記 | 株式会社Amber',
  description: '株式会社Amberの特定商取引法に基づく表記です。',
  alternates: {
    canonical: `${siteUrl}/legal/tokushoho`,
  },
}

const rows = [
  { label: '販売業者', value: companyInfo.legalName },
  {
    label: '代表責任者',
    value: `${companyInfo.representativeTitle} ${companyInfo.representativeName}`,
  },
  { label: '所在地', value: companyInfo.fullAddress },
  { label: '電話番号', value: companyInfo.phone },
  { label: 'メールアドレス', value: companyInfo.email },
  {
    label: '販売価格',
    value: '各サービスページまたは個別のお見積りにて表示します。',
  },
  {
    label: '商品以外の必要料金',
    value: '消費税、振込手数料など。発生する場合は事前にご案内します。',
  },
  {
    label: '支払方法',
    value: '銀行振込、その他当社が定める方法。',
  },
  {
    label: '支払時期',
    value: '契約内容に応じて、請求書発行後の指定期日まで。',
  },
  {
    label: '役務の提供時期',
    value: '契約成立後、個別契約に定めるスケジュールに従い提供します。',
  },
  {
    label: '返品・キャンセル',
    value:
      '役務の性質上、原則として提供開始後のキャンセル・返金には応じられません。個別契約に別段の定めがある場合はそれに従います。',
  },
] as const

export default function TokushohoPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pb-24 pt-28">
        <div className="home-container">
          <p className="home-label mb-3 text-brand-green">Legal</p>
          <h1 className="home-h2 mb-3">特定商取引法に基づく表記</h1>
          <p className="mb-10 text-sm text-secondary">法務文書</p>
          <div className="mx-auto max-w-[800px]">
            <dl className="divide-y divide-sequoia-black/10 border-y border-sequoia-black/10">
              {rows.map((row) => (
                <div
                  key={row.label}
                  className="grid gap-2 py-5 md:grid-cols-[220px_1fr] md:gap-8"
                >
                  <dt className="text-sm font-medium text-sequoia-black">{row.label}</dt>
                  <dd className="leading-relaxed text-sequoia-black">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
