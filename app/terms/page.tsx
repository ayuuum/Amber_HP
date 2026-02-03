import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://amber-inc.com'

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
      <main className="min-h-screen pt-24 pb-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-deep-forest-green mb-8">
            利用規約
          </h1>
          <div className="prose prose-lg max-w-none text-deep-forest-green leading-relaxed space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-deep-forest-green mt-8 mb-4">第1条（適用）</h2>
              <p>
                本規約は、株式会社Amber（以下「当社」）が提供するサービス（以下「本サービス」）の利用条件を定めるものです。
                本サービスを利用するすべてのユーザー（以下「ユーザー」）は、本規約に同意したものとみなされます。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-deep-forest-green mt-8 mb-4">第2条（利用登録）</h2>
              <p>
                本サービスの利用を希望する方は、当社が定める方法により、利用登録を申請するものとします。
                当社は、利用登録の申請に対して、承認または不承認の決定を行うことができます。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-deep-forest-green mt-8 mb-4">第3条（サービスの内容）</h2>
              <p>本サービスは、以下の内容を提供します：</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>AI顧問サービス</li>
                <li>法人向け生成AI研修</li>
                <li>ホームサービス向けVertical SaaS</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-deep-forest-green mt-8 mb-4">第4条（利用料金）</h2>
              <p>
                本サービスの利用料金は、各サービスページに記載の通りとします。
                料金は、当社が別途定める方法により、ユーザーから受領します。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-deep-forest-green mt-8 mb-4">第5条（禁止事項）</h2>
              <p>ユーザーは、本サービスの利用にあたり、以下の行為を行ってはなりません：</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>法令または公序良俗に違反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>当社のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
                <li>当社のサービスの運営を妨害するおそれのある行為</li>
                <li>その他、当社が不適切と判断する行為</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-deep-forest-green mt-8 mb-4">第6条（免責事項）</h2>
              <p>
                当社は、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。
                また、本サービスの内容、正確性、完全性、適時性、有用性等についても保証しません。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-deep-forest-green mt-8 mb-4">第7条（規約の変更）</h2>
              <p>
                当社は、必要と判断した場合には、ユーザーに通知することなく本規約を変更することができます。
                変更後の規約は、本サイト上に掲載した時点で効力を生じるものとします。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-deep-forest-green mt-8 mb-4">第8条（お問い合わせ）</h2>
              <p>
                本規約に関するお問い合わせは、以下の連絡先までご連絡ください。
              </p>
              <div className="bg-white/20 p-6 rounded-sm mt-4">
                <p className="font-semibold mb-2">株式会社Amber</p>
                <p>メール: ayumu.matsui@amber-inc.com</p>
                <p>電話: 080-3814-0263</p>
              </div>
            </section>

            <section>
              <p className="text-sm text-deep-forest-green/70 mt-8">
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


