import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { siteUrl } from '@/lib/site-metadata'

export const metadata: Metadata = {
  title: '特定商取引法に基づく表記',
  description: '株式会社Amberの特定商取引法に基づく表記です。',
  alternates: {
    canonical: `${siteUrl}/legal/tokushoho`,
  },
}

const rows = [
  { label: '販売事業者', value: '株式会社Amber' },
  { label: '代表責任者', value: '松井 歩武' },
  { label: '所在地', value: '〒105-0001 東京都港区虎ノ門３丁目１−１ 2階' },
  { label: '電話番号', value: '080-3814-0263' },
  { label: 'メールアドレス', value: 'ayumu.matsui@amber-inc.com' },
  {
    label: '販売価格',
    value: '各支援内容・契約内容に応じて個別にお見積りします。表示価格がある場合は税込／税別を明示します。',
  },
  {
    label: '代金の支払時期・方法',
    value: '個別契約に定める方法（請求書払い等）によります。支払時期は契約書または見積書に記載します。',
  },
  {
    label: '役務の提供時期',
    value: '個別契約に定めるスケジュールに従い提供します。',
  },
  {
    label: '返品・キャンセル',
    value:
      '無形の役務提供のため、原則として提供開始後の返品には応じられません。キャンセル条件は個別契約に従います。',
  },
  {
    label: '動作環境等',
    value: '研修・開発・伴走支援は、利用者の業務環境・利用ツールに依存します。必要な条件は事前に確認します。',
  },
] as const

export default function TokushohoPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pb-24 pt-28">
        <div className="home-container">
          <p className="home-label mb-3 text-brand-green">法務</p>
          <h1 className="home-h2 mb-10">特定商取引法に基づく表記</h1>
          <div className="mx-auto max-w-[800px] overflow-hidden rounded-2xl border border-sequoia-black/8">
            <dl>
              {rows.map((row) => (
                <div
                  key={row.label}
                  className="grid gap-2 border-b border-sequoia-black/8 px-5 py-4 last:border-b-0 sm:grid-cols-[200px_1fr] sm:gap-6 md:px-6"
                >
                  <dt className="text-sm font-medium text-sequoia-black">{row.label}</dt>
                  <dd className="text-sm leading-relaxed text-secondary">{row.value}</dd>
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
