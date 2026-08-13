import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'
import CaseStudyCard from '@/components/ui/CaseStudyCard'
import ContactCTA from '@/components/ui/ContactCTA'
import PageBreadcrumbs from '@/components/ui/PageBreadcrumbs'
import { cases } from '@/data/cases'
import { siteUrl } from '@/lib/site-metadata'

export const metadata: Metadata = {
  title: '支援事例 | 生成AI導入・活用の取り組み',
  description: '守秘義務により企業名は非公開の、Amberの支援事例・支援テーマをご紹介します。',
  alternates: { canonical: `${siteUrl}/cases` },
}

export default function CasesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <PageHero
        tone="offwhite"
        eyebrow="支援事例"
        headingLines={['生成AI活用の、', '取り組み事例。']}
        body="守秘のため企業名は非公開です。取り組みの一例です。"
      />
      <section className="home-section bg-white pt-0 md:pt-0">
        <div className="home-container">
          <PageBreadcrumbs items={[{ label: 'トップ', href: '/' }, { label: '支援事例' }]} />
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cases.map((item) => (
              <li key={item.slug}>
                <CaseStudyCard item={item} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ContactCTA source="cases" />
      <Footer />
    </main>
  )
}
