import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.amber-inc.com'

export const metadata: Metadata = {
  title: 'プライバシーポリシー | 株式会社Amber',
  description: '株式会社Amberのプライバシーポリシーです。',
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-deep-forest-green mb-8">
            プライバシーポリシー
          </h1>
          <div className="prose prose-lg max-w-none text-deep-forest-green leading-relaxed space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-deep-forest-green mt-8 mb-4">1. 個人情報の取り扱いについて</h2>
              <p>
                株式会社Amber（以下「当社」）は、お客様の個人情報を適切に保護し、管理することを重要な責務と認識しています。
                本プライバシーポリシーは、当社が収集する個人情報の種類、利用目的、管理方法について説明します。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-deep-forest-green mt-8 mb-4">2. 収集する個人情報</h2>
              <p>当社は、以下の個人情報を収集する場合があります：</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>お名前</li>
                <li>メールアドレス</li>
                <li>電話番号</li>
                <li>会社名</li>
                <li>その他、お問い合わせ内容に含まれる情報</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-deep-forest-green mt-8 mb-4">3. 個人情報の利用目的</h2>
              <p>当社は、収集した個人情報を以下の目的で利用します：</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>お問い合わせへの対応</li>
                <li>サービス提供のための連絡</li>
                <li>サービス改善のための分析</li>
                <li>新サービス・キャンペーン等のご案内（同意いただいた場合）</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-deep-forest-green mt-8 mb-4">4. 個人情報の管理</h2>
              <p>
                当社は、個人情報の漏洩、滅失、毀損を防止するため、適切な安全管理措置を講じています。
                また、個人情報へのアクセスを必要最小限の従業員に限定し、適切な管理を行っています。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-deep-forest-green mt-8 mb-4">5. 個人情報の第三者提供</h2>
              <p>
                当社は、法令に基づく場合を除き、お客様の同意なく個人情報を第三者に提供することはありません。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-deep-forest-green mt-8 mb-4">6. お問い合わせ</h2>
              <p>
                個人情報に関するお問い合わせは、以下の連絡先までご連絡ください。
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


