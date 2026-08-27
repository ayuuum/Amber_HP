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
  title: 'Work | Transforming Essential Operations.',
  description: 'どの産業の、どの業務を、どう変えたか。守秘のため企業名は非公開の、Amberの取り組み事例です。',
  alternates: { canonical: `${siteUrl}/cases` },
}

export default function CasesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <PageHero
        tone="offwhite"
        eyebrow="Work"
        headingLines={['Transforming Essential Operations.']}
        body="どの産業の、どの業務を、どう変えたか。守秘のため企業名は非公開です。"
      />
      <section className="home-section bg-white pt-0 md:pt-0">
        <div className="home-container">
          <PageBreadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Work' }]} />
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
