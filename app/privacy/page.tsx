import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.amber-inc.com'

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: '株式会社Amberのプライバシーポリシーです。',
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pb-24 pt-28">
        <div className="home-container">
          <p className="home-label mb-3 text-brand-green">プライバシーポリシー</p>
          <h1 className="home-h2 mb-3">プライバシーポリシー</h1>
          <p className="mb-10 text-sm text-secondary">最終更新日: 2026年1月1日</p>
          <div className="mx-auto max-w-[800px] space-y-6 text-sequoia-black leading-relaxed">
            <section>
              <h2 className="mb-4 mt-8 text-xl font-medium text-sequoia-black">1. 個人情報の取り扱いについて</h2>
              <p>
                株式会社Amber（以下「当社」）は、お客様の個人情報を適切に保護し、管理することを重要な責務と認識しています。
                本プライバシーポリシーは、当社が収集する個人情報の種類、利用目的、管理方法について説明します。
              </p>
            </section>

            <section>
              <h2 className="mb-4 mt-8 text-xl font-medium text-sequoia-black">2. 収集する個人情報</h2>
              <p>当社は、以下の個人情報を収集する場合があります：</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>お名前</li>
                <li>メールアドレス</li>
                <li>電話番号</li>
                <li>会社名</li>
                <li>その他、お問い合わせ内容に含まれる情報</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 mt-8 text-xl font-medium text-sequoia-black">3. 個人情報の利用目的</h2>
              <p>当社は、収集した個人情報を以下の目的で利用します：</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>お問い合わせへの対応</li>
                <li>サービス提供のための連絡</li>
                <li>サービス改善のための分析</li>
                <li>新サービス・キャンペーン等のご案内（同意いただいた場合）</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 mt-8 text-xl font-medium text-sequoia-black">4. 個人情報の管理</h2>
              <p>
                当社は、個人情報の漏洩、滅失、毀損を防止するため、適切な安全管理措置を講じています。
                また、個人情報へのアクセスを必要最小限の従業員に限定し、適切な管理を行っています。
              </p>
            </section>

            <section>
              <h2 className="mb-4 mt-8 text-xl font-medium text-sequoia-black">5. 個人情報の第三者提供</h2>
              <p>
                当社は、法令に基づく場合を除き、お客様の同意なく個人情報を第三者に提供することはありません。
              </p>
            </section>

            <section>
              <h2 className="mb-4 mt-8 text-xl font-medium text-sequoia-black">6. お問い合わせ</h2>
              <p>
                個人情報に関するお問い合わせは、以下の連絡先までご連絡ください。
              </p>
              <div className="mt-4 rounded-2xl border border-sequoia-black/8 bg-off-white p-6">
                <p className="mb-2 font-medium">株式会社Amber</p>
                <p>メール: ayumu.matsui@amber-inc.com</p>
                <p>電話: 080-3814-0263</p>
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


