import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { companyInfo } from '@/lib/company-info'
import { siteUrl } from '@/lib/site-metadata'

export const metadata: Metadata = {
  title: '利用規約 | 株式会社Amber',
  description: '株式会社Amberの利用規約です。',
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
          <p className="home-label mb-3 text-brand-green">Legal</p>
          <h1 className="home-h2 mb-3">利用規約</h1>
          <p className="mb-10 text-sm text-secondary">法務文書</p>
          <div className="mx-auto max-w-[800px] space-y-6 text-sequoia-black leading-relaxed">
            <section>
              <h2 className="mb-4 mt-8 text-xl font-medium text-sequoia-black">第1条（適用）</h2>
              <p>
                本規約は、{companyInfo.legalName}（以下「当社」）が提供するサービス（以下「本サービス」）の利用条件を定めるものです。
                本サービスを利用するすべてのユーザー（以下「ユーザー」）は、本規約に同意したものとみなされます。
              </p>
            </section>

            <section>
              <h2 className="mb-4 mt-8 text-xl font-medium text-sequoia-black">第2条（利用登録）</h2>
              <p>
                本サービスの利用を希望する方は、当社が定める方法により、利用登録を申請するものとします。
                当社は、利用登録の申請に対して、承認または不承認の決定を行うことができます。
              </p>
            </section>

            <section>
              <h2 className="mb-4 mt-8 text-xl font-medium text-sequoia-black">第3条（サービスの内容）</h2>
              <p>本サービスは、以下の内容を提供します：</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Essential Industries向けの業務変革・業務設計</li>
                <li>AI・業務システムの設計開発</li>
                <li>データ・既存システム連携</li>
                <li>生成AI研修・定着支援</li>
                <li>プロダクト事業（訪問サービス向け業務管理「Pine」など）</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 mt-8 text-xl font-medium text-sequoia-black">第4条（利用料金）</h2>
              <p>
                本サービスの利用料金は、各サービスページに記載の通りとします。
                料金は、当社が別途定める方法により、ユーザーから受領します。
              </p>
            </section>

            <section>
              <h2 className="mb-4 mt-8 text-xl font-medium text-sequoia-black">第5条（禁止事項）</h2>
              <p>ユーザーは、本サービスの利用にあたり、以下の行為を行ってはなりません：</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>法令または公序良俗に違反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>当社のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
                <li>当社のサービスの運営を妨害するおそれのある行為</li>
                <li>その他、当社が不適切と判断する行為</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 mt-8 text-xl font-medium text-sequoia-black">第6条（免責事項）</h2>
              <p>
                当社は、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。
                また、本サービスの内容、正確性、完全性、適時性、有用性等についても保証しません。
              </p>
            </section>

            <section>
              <h2 className="mb-4 mt-8 text-xl font-medium text-sequoia-black">第7条（規約の変更）</h2>
              <p>
                当社は、必要と判断した場合には、ユーザーに通知することなく本規約を変更することができます。
                変更後の規約は、本サイト上に掲載した時点で効力を生じるものとします。
              </p>
            </section>

            <section>
              <h2 className="mb-4 mt-8 text-xl font-medium text-sequoia-black">第8条（お問い合わせ）</h2>
              <p>
                本規約に関するお問い合わせは、以下の連絡先までご連絡ください。
              </p>
              <div className="mt-4 rounded-2xl border border-sequoia-black/8 bg-off-white p-6">
                <p className="mb-2 font-medium">{companyInfo.legalName}</p>
                <p>{companyInfo.fullAddress}</p>
                <p>メール: {companyInfo.email}</p>
                <p>電話: {companyInfo.phone}</p>
              </div>
            </section>

            <section>
              <p className="mt-8 text-sm text-secondary">
                制定日: 2026年1月1日<br />
                最終更新日: 2026年1月1日
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
