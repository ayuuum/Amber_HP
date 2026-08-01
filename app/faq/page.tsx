import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'
import FaqAccordion from '@/components/ui/FaqAccordion'
import ContactCTA from '@/components/ui/ContactCTA'
import PageBreadcrumbs from '@/components/ui/PageBreadcrumbs'
import JsonLd from '@/components/JsonLd'
import { faqCategories } from '@/lib/faq-data'
import { siteUrl } from '@/lib/site-metadata'

export const metadata: Metadata = {
  title: 'よくあるご質問',
  description: 'AmberのAI活用支援、研修、開発、契約・費用、セキュリティに関するよくあるご質問。',
  alternates: { canonical: `${siteUrl}/faq` },
}

export default function FaqPage() {
  const allItems = faqCategories.flatMap((c) => c.items)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={faqSchema} />
      <Header />
      <PageHero tone="offwhite" eyebrow="よくあるご質問" headingLines={['よくあるご質問']} body="支援内容、研修、開発、費用、セキュリティについてまとめました。" />
      <section className="home-section bg-white pt-0 md:pt-0">
        <div className="home-container max-w-3xl">
          <PageBreadcrumbs items={[{ label: 'トップ', href: '/' }, { label: 'よくあるご質問' }]} />
          <div className="space-y-12">
            {faqCategories.map((category) => (
              <div key={category.id} id={category.id}>
                <h2 className="mb-4 text-lg font-medium text-sequoia-black">{category.title}</h2>
                <FaqAccordion items={category.items} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <ContactCTA source="faq" />
      <Footer />
    </main>
  )
}
