import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageBreadcrumbs from '@/components/ui/PageBreadcrumbs'
import ContactCTA from '@/components/ui/ContactCTA'
import { getAllCaseSlugs, getCaseBySlug } from '@/data/cases'
import { siteUrl } from '@/lib/site-metadata'

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return getAllCaseSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const item = getCaseBySlug(params.slug)
  if (!item) return { title: '支援事例' }
  return {
    title: `${item.theme} | ${item.industry}`,
    description: item.change,
    alternates: { canonical: `${siteUrl}/cases/${item.slug}` },
  }
}

export default function CaseDetailPage({ params }: Props) {
  const item = getCaseBySlug(params.slug)
  if (!item) notFound()

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <article className="pt-28 md:pt-32">
        <div className="home-container pb-16 md:pb-24">
          <PageBreadcrumbs
            items={[
              { label: 'トップ', href: '/' },
              { label: '支援事例', href: '/cases' },
              { label: item.theme },
            ]}
          />
          <p className="home-label mb-3 text-brand-green">{item.industry}</p>
          {item.anonymous ? (
            <p className="mb-4 text-sm text-secondary">本事例は守秘義務のため、企業名を伏せて掲載しています。</p>
          ) : null}
          <h1 className="home-h2 mb-8 max-w-3xl">{item.theme}</h1>

          <div className="relative mb-12 aspect-[21/9] max-h-80 overflow-hidden rounded-2xl bg-sequoia-black/5">
            <Image src={item.image} alt={item.imageAlt} fill className="object-cover brightness-[0.88]" sizes="100vw" priority />
          </div>

          <div className="mx-auto grid max-w-3xl gap-10">
            <section>
              <h2 className="mb-3 text-lg font-medium text-sequoia-black">顧客課題</h2>
              <p className="leading-relaxed text-secondary">{item.challenge}</p>
            </section>
            <section>
              <h2 className="mb-3 text-lg font-medium text-sequoia-black">支援前の状態</h2>
              <p className="leading-relaxed text-secondary">{item.beforeState}</p>
            </section>
            <section>
              <h2 className="mb-3 text-lg font-medium text-sequoia-black">Amberが実施したこと</h2>
              <p className="leading-relaxed text-secondary">{item.support}</p>
            </section>
            <section>
              <h2 className="mb-3 text-lg font-medium text-sequoia-black">支援後の変化</h2>
              <p className="leading-relaxed text-secondary">{item.change}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="home-card border border-sequoia-black/8 bg-off-white p-5">
                  <p className="mb-2 text-xs text-secondary">Before</p>
                  <p className="text-sm text-sequoia-black">{item.before}</p>
                </div>
                <div className="home-card border border-brand-green/15 bg-light-green p-5">
                  <p className="mb-2 text-xs text-brand-green">After</p>
                  <p className="text-sm text-sequoia-black">{item.after}</p>
                </div>
              </div>
            </section>
            <section>
              <h2 className="mb-3 text-lg font-medium text-sequoia-black">成果物</h2>
              <ul className="list-disc space-y-1 pl-5 text-secondary">
                {item.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="mb-3 text-lg font-medium text-sequoia-black">今後の展開</h2>
              <p className="leading-relaxed text-secondary">{item.nextSteps}</p>
            </section>
            <section>
              <h2 className="mb-3 text-lg font-medium text-sequoia-black">関連サービス</h2>
              <ul className="flex flex-wrap gap-3">
                {item.relatedServices.map((s) => (
                  <li key={s.href + s.label}>
                    <Link href={s.href} className="btn-pill-outline text-sm">
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </article>
      <ContactCTA source="case-detail" />
      <Footer />
    </main>
  )
}
