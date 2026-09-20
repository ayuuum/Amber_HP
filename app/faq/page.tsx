import type { Metadata } from 'next'
import Link from 'next/link'
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
  title: 'よくある質問 | 生成AI導入・業務システム開発',
  description:
    'Amberの生成AI導入、業務変革、AI・業務システム開発、データ連携、契約・費用、セキュリティに関するよくある質問。',
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
      <PageHero
        tone="dark"
        eyebrow="FAQ"
        headingLines={['よくあるご質問']}
        body="支援内容、研修、開発、費用、セキュリティについてまとめました。"
        image={{ src: '/images/brand/domain-knowledge.jpg', alt: '知識とドキュメントを表すイメージ' }}
      />
      <section className="home-section bg-white pt-0 md:pt-0">
        <div className="home-container max-w-3xl">
          <PageBreadcrumbs items={[{ label: 'トップ', href: '/' }, { label: 'よくあるご質問' }]} />
          <div className="space-y-12">
            {faqCategories.map((category) => (
              <div key={category.id} id={category.id} className="scroll-mt-24">
                <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                  <h2 className="text-lg font-medium text-sequoia-black">{category.title}</h2>
                  {category.id === 'security' ? (
                    <Link
                      href="/security"
                      className="text-sm font-medium text-brand-green underline-offset-2 hover:underline"
                    >
                      セキュリティ方針の詳細
                    </Link>
                  ) : null}
                </div>
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
