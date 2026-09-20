import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { companyInfo } from '@/lib/company-info'
import { siteUrl } from '@/lib/site-metadata'

export const metadata: Metadata = {
  title: 'セキュリティとデータの取り扱い | 株式会社Amber',
  description:
    '株式会社Amberのセキュリティ方針、データの取り扱い、AI利用時の考え方、お問い合わせ窓口について。',
  alternates: {
    canonical: `${siteUrl}/security`,
  },
}

export default function SecurityPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pb-24 pt-28">
        <div className="home-container">
          <p className="home-label mb-3 text-brand-green">Trust</p>
          <h1 className="home-h2 mb-3">セキュリティとデータの取り扱い</h1>
          <p className="mb-10 max-w-2xl text-sm leading-relaxed text-secondary">
            企業向けのAI・ソフトウェア支援において、扱う情報の範囲と権限を明確にし、顧客の既存ルールを前提に進めます。
            最終更新日: 2026年9月20日
          </p>

          <div className="mx-auto max-w-[800px] space-y-6 text-sequoia-black leading-relaxed">
            <section>
              <h2 className="mb-4 mt-8 text-xl font-medium text-sequoia-black">1. 扱うデータの範囲</h2>
              <p className="mb-3">
                当社が取り扱う情報には、主に次のものが含まれます。
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>お問い合わせフォーム等でご提供いただく連絡先・相談内容</li>
                <li>プロジェクト遂行のために顧客から共有される業務・システム関連情報</li>
                <li>契約・請求に必要な法人・担当者情報</li>
              </ul>
              <p className="mt-3">
                個人情報の詳細な取り扱いについては、
                <Link href="/privacy" className="text-brand-green underline-offset-2 hover:underline">
                  プライバシーポリシー
                </Link>
                をご覧ください。
              </p>
            </section>

            <section>
              <h2 className="mb-4 mt-8 text-xl font-medium text-sequoia-black">2. アクセス制御</h2>
              <p>
                情報へのアクセスは、業務上必要な最小限の担当者に限定します。顧客環境への接続や権限設定は、既存のIT環境・運用ルールを前提に、情報システム部門と現場の双方が進めやすい形で設計します。
              </p>
            </section>

            <section>
              <h2 className="mb-4 mt-8 text-xl font-medium text-sequoia-black">3. AI利用時の方針</h2>
              <ul className="list-disc space-y-2 pl-6">
                <li>顧客から共有された機密情報を、当社の汎用モデル学習に無断で転用しません。</li>
                <li>AI出力は業務判断の補助として扱い、重要な決定や対外発信は人の確認を前提とします。</li>
                <li>扱う情報の範囲、権限、利用ツールはプロジェクト開始時に合意します。</li>
                <li>ミッションクリティカルな運用では、例外処理・レビュー手順・責任分界を設計に含めます。</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 mt-8 text-xl font-medium text-sequoia-black">4. 委託・インフラ</h2>
              <p>
                メール配信、ホスティング、開発・運用に必要なクラウドサービス等を外部委託する場合があります。委託先には必要な範囲でのみ情報を提供し、適切な管理を求めます。具体的な構成は案件ごとに異なり、過度に詳細な内部構成は公開しません。必要に応じて個別にご説明します。
              </p>
            </section>

            <section>
              <h2 className="mb-4 mt-8 text-xl font-medium text-sequoia-black">5. インシデント・お問い合わせ</h2>
              <p className="mb-3">
                セキュリティやデータの取り扱いに関するご質問、インシデントの疑いがある場合は、速やかに以下へご連絡ください。
              </p>
              <div className="mt-4 rounded-2xl border border-sequoia-black/8 bg-off-white p-6">
                <p className="mb-2 font-medium">{companyInfo.legalName}</p>
                <p className="mb-4">{companyInfo.fullAddress}</p>
                <p className="mb-3 text-sm leading-relaxed text-sequoia-black/80">
                  セキュリティやデータの取り扱いに関するご連絡は、お問い合わせフォームよりお願いいたします。
                </p>
                <Link
                  href="/contact?source=security"
                  className="inline-flex min-h-11 items-center text-sm font-medium text-brand-green hover:underline"
                >
                  お問い合わせフォームへ
                </Link>
              </div>
              <p className="mt-4 text-sm text-secondary">
                関連ページ:{' '}
                <Link href="/privacy" className="text-brand-green underline-offset-2 hover:underline">
                  プライバシーポリシー
                </Link>
                {' · '}
                <Link href="/faq#security" className="text-brand-green underline-offset-2 hover:underline">
                  セキュリティFAQ
                </Link>
                {' · '}
                <Link href="/contact" className="text-brand-green underline-offset-2 hover:underline">
                  お問い合わせ
                </Link>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
