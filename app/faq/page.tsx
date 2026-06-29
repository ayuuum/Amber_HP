import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FaqSection from '@/components/sections/FaqSection'
import { faqCategories } from '@/lib/faq-data'
import { siteUrl } from '@/lib/site-metadata'

export const metadata: Metadata = {
  title: 'よくある質問 | 株式会社Amber',
  description:
    'AIソリューション、助成金、Pine（AI SaaS）に関するよくある質問。Amberのサービスについてのご質問にお答えします。',
  alternates: {
    canonical: `${siteUrl}/faq`,
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqCategories.flatMap((category) =>
    category.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  ),
}

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-color-bg">
      <Header />
      <div className="mx-auto max-w-3xl px-6 pt-32 pb-16 md:pt-40">
        <p className="eyebrow-light mb-4">FAQ</p>
        <h1 className="page-heading mb-4">よくある質問</h1>
        <p className="text-body mb-12 text-sequoia-black/75">
          サービスに関するよくあるご質問をまとめています。お探しの内容が見つからない場合は、お問い合わせフォームからご連絡ください。
        </p>
        <FaqSection />
      </div>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </main>
  )
}
