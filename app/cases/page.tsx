import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'
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
        tone="dark"
        eyebrow="Work"
        headingLines={['Transforming Essential Operations.']}
        body="どの産業の、どの業務を、どう変えたか。守秘のため企業名は非公開です。"
        image={{ src: '/images/brand/method-forest.jpg', alt: '森の風景' }}
      />
      <section className="home-section bg-white pt-0 md:pt-0">
        <div className="home-container">
          <PageBreadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Work' }]} />
          <ul className="divide-y divide-sequoia-black/10 border-y border-sequoia-black/10">
            {cases.map((item) => (
              <li key={item.slug}>
                <article className="grid gap-4 py-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-10 md:py-10">
                  <div>
                    <p className="home-label mb-3 text-brand-green">{item.enIndustry}</p>
                    <h2 className="home-h3 mb-3">{item.theme}</h2>
                    <p className="home-body max-w-2xl text-pretty">{item.challenge}</p>
                  </div>
                  <Link
                    href={`/cases/${item.slug}`}
                    className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-sm font-medium text-brand-green hover:underline"
                  >
                    詳細を見る
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </article>
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
