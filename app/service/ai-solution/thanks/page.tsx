import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import OpenAIAdsConversion from '@/components/OpenAIAdsConversion'
import { PrimaryButton, SecondaryButton } from '@/components/ui/PrimaryButton'

export const metadata: Metadata = {
  title: '送信ありがとうございます | AI活用・実装支援',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AiSolutionThanksPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <OpenAIAdsConversion />
      <section className="home-section bg-off-white pt-28 md:pt-32">
        <div className="home-container max-w-3xl text-center">
          <p className="home-label mb-4 text-brand-green">Thank you</p>
          <h1 className="home-h2 mb-6">送信ありがとうございます。</h1>
          <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-secondary">
            内容を確認し、担当者よりご連絡します。構想・研修・開発・定着の進め方を、現在の状況に合わせて整理します。
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <PrimaryButton href="/service/ai-solution">AI活用・実装支援へ戻る</PrimaryButton>
            <SecondaryButton href="/">トップへ戻る</SecondaryButton>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
