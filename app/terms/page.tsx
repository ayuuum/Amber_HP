import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { siteUrl } from '@/lib/site-metadata'

export const metadata: Metadata = {
  title: '利用規約',
  description: '株式会社Amberが提供するAI活用・実装支援および関連サービスの利用条件です。',
  alternates: {
    canonical: `${siteUrl}/terms`,
  },
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pb-24 pt-28">
        <div className="home-container">
          <p className="home-label mb-3 text-brand-green">利用規約</p>
          <h1 className="home-h2 mb-3">利用規約</h1>
          <p className="mb-10 text-sm text-secondary">最終更新日: 2026年7月27日</p>
          <div className="mx-auto max-w-[800px] space-y-6 leading-relaxed text-sequoia-black">
            <section>
              <h2 className="mb-4 mt-8 text-xl font-medium text-sequoia-black">第1条（適用）</h2>
              <p>
                本規約は、株式会社Amber（以下「当社」）が提供するAI活用・実装支援、関連する研修・開発・伴走支援、ならびに当社ウェブサイト上の情報提供（以下総称して「本サービス」）の利用条件を定めるものです。
                本サービスを利用するすべての方（以下「利用者」）は、本規約に同意したものとみなされます。
              </p>
            </section>

            <section>
              <h2 className="mb-4 mt-8 text-xl font-medium text-sequoia-black">第2条（サービスの内容）</h2>
              <p>本サービスには、次のものが含まれます。</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>AI活用実行ロードマップの策定支援</li>
                <li>AI人材育成・業務定着に関する研修および伴走</li>
                <li>AIエージェント・業務システムの設計・開発支援</li>
                <li>現場伴走・継続改善に関する支援</li>
                <li>当社ウェブサイトにおける情報の閲覧・お問い合わせ</li>
                <li>当社が別途定めるプロダクト（例：Pine）に関する案内</li>
              </ul>
              <p className="mt-4">
                個別契約がある場合、当該契約の定めが本規約に優先します。プロダクト固有の条件がある場合は、各プロダクトの利用条件が適用されます。
              </p>
            </section>

            <section>
              <h2 className="mb-4 mt-8 text-xl font-medium text-sequoia-black">第3条（相談・契約）</h2>
              <p>
                ウェブサイトからのお問い合わせは、契約の成立を意味しません。支援内容、期間、料金その他の条件は、見積または個別契約により確定します。
              </p>
            </section>

            <section>
              <h2 className="mb-4 mt-8 text-xl font-medium text-sequoia-black">第4条（利用料金）</h2>
              <p>
                有償支援の料金は、個別見積または契約書に定めるものとします。ウェブサイト上の一般的な説明は参考情報であり、最終条件ではありません。
              </p>
            </section>

            <section>
              <h2 className="mb-4 mt-8 text-xl font-medium text-sequoia-black">第5条（禁止事項）</h2>
              <p>利用者は、本サービスの利用にあたり、次の行為を行ってはなりません。</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>法令または公序良俗に違反する行為</li>
                <li>虚偽の情報を用いた問い合わせ、なりすまし</li>
                <li>当社または第三者の権利・利益を侵害する行為</li>
                <li>本サービスの運営を妨害する行為</li>
                <li>その他、当社が不適切と判断する行為</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 mt-8 text-xl font-medium text-sequoia-black">第6条（知的財産）</h2>
              <p>
                本サービスおよび当社ウェブサイトに関する著作権その他の知的財産権は、当社または正当な権利者に帰属します。個別契約で成果物の権利帰属を別途定める場合は、その定めに従います。
              </p>
            </section>

            <section>
              <h2 className="mb-4 mt-8 text-xl font-medium text-sequoia-black">第7条（免責）</h2>
              <p>
                当社は、本サービスおよびウェブサイト上の情報について、正確性・完全性・有用性を保証しません。
                個別契約で定める場合を除き、本サービスの利用により生じた損害について、当社に故意または重過失がある場合を除き責任を負いません。
              </p>
            </section>

            <section>
              <h2 className="mb-4 mt-8 text-xl font-medium text-sequoia-black">第8条（個人情報）</h2>
              <p>
                本サービスに関連して取得する個人情報の取扱いは、当社の
                <a href="/privacy" className="text-brand-green hover:underline">
                  プライバシーポリシー
                </a>
                に従います。
              </p>
            </section>

            <section>
              <h2 className="mb-4 mt-8 text-xl font-medium text-sequoia-black">第9条（規約の変更）</h2>
              <p>
                当社は、必要に応じて本規約を変更できます。変更後の規約は、本サイトに掲載した時点から効力を生じるものとします。
              </p>
            </section>

            <section>
              <h2 className="mb-4 mt-8 text-xl font-medium text-sequoia-black">第10条（お問い合わせ）</h2>
              <p>本規約に関するお問い合わせは、次の連絡先までご連絡ください。</p>
              <div className="mt-4 rounded-2xl border border-sequoia-black/8 bg-off-white p-6">
                <p className="mb-2 font-medium">株式会社Amber</p>
                <p>メール: ayumu.matsui@amber-inc.com</p>
                <p>電話: 080-3814-0263</p>
              </div>
            </section>

            <section>
              <p className="mt-8 text-sm text-secondary">
                制定日: 2026年1月1日
                <br />
                最終更新日: 2026年7月27日
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
