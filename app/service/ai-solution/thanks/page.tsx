import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: '送信ありがとうございます | AIソリューション',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AiSolutionThanksPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen overflow-x-hidden bg-color-bg pt-28">
        <script
          id="ai-solution-lead-conversion"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: 'ai_solution_lead',
              conversion_location: 'ai_solution_thanks'
            });
            document.documentElement.dataset.aiSolutionLead = '1';
          `,
          }}
        />
        <section className="mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
          <p className="eyebrow-light mb-5">Thank you</p>
          <h1 className="section-heading mb-6">
            送信ありがとうございます。
          </h1>
          <p className="text-body mx-auto max-w-2xl text-sequoia-black/80">
            内容を確認し、担当者よりご連絡します。研修・開発・助成金活用の進め方を、現在の状況に合わせて整理します。
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/service/ai-solution" className="btn-secondary">
              AIソリューションへ戻る
            </Link>
            <Link href="/" className="btn-primary">
              トップへ戻る
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
