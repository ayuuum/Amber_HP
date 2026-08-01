import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageBreadcrumbs from '@/components/ui/PageBreadcrumbs'
import ContactCTA from '@/components/ui/ContactCTA'
import { getAllCaseSlugs, getCaseBySlug, cases } from '@/data/cases'
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
    description: item.summary || item.change,
    alternates: { canonical: `${siteUrl}/cases/${item.slug}` },
  }
}

export default function CaseDetailPage({ params }: Props) {
  const item = getCaseBySlug(params.slug)
  if (!item) notFound()

  const others = cases.filter((c) => c.slug !== item.slug).slice(0, 2)

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

          <div className="mb-3 flex flex-wrap items-center gap-2">
            <p className="home-label text-brand-green">{item.industry}</p>
            <span className="rounded-full border border-sequoia-black/10 bg-off-white px-2.5 py-0.5 text-xs text-secondary">
              {item.status}
            </span>
            {item.anonymous ? (
              <span className="rounded-full border border-sequoia-black/10 bg-off-white px-2.5 py-0.5 text-xs text-secondary">
                守秘のため匿名
              </span>
            ) : null}
          </div>
          <h1 className="home-h2 mb-4 max-w-3xl">{item.theme}</h1>
          <p className="mb-8 max-w-2xl text-base leading-relaxed text-secondary md:text-lg">{item.summary}</p>
          {item.anonymous ? (
            <p className="mb-8 text-sm text-secondary">
              本事例は守秘義務のため、企業名および定量的な成果数値は掲載していません。業界・支援内容・変化の定性情報をもとにご紹介します。
            </p>
          ) : null}

          <div className="relative mb-10 aspect-[21/9] max-h-80 overflow-hidden rounded-2xl bg-sequoia-black/5 md:mb-12">
            <Image src={item.image} alt={item.imageAlt} fill className="object-cover brightness-[0.88]" sizes="100vw" priority />
          </div>

          <div className="mb-12 grid gap-4 sm:grid-cols-3">
            <div className="home-card border border-sequoia-black/8 bg-off-white p-5">
              <p className="mb-2 text-xs text-secondary">業界</p>
              <p className="text-sm font-medium text-sequoia-black">{item.industry}</p>
            </div>
            <div className="home-card border border-sequoia-black/8 bg-off-white p-5">
              <p className="mb-2 text-xs text-secondary">支援テーマ</p>
              <p className="text-sm font-medium text-sequoia-black">{item.theme}</p>
            </div>
            <div className="home-card border border-sequoia-black/8 bg-off-white p-5">
              <p className="mb-2 text-xs text-secondary">区分</p>
              <p className="text-sm font-medium text-sequoia-black">{item.status}</p>
            </div>
          </div>

          <div className="mx-auto grid max-w-3xl gap-10">
            <section>
              <h2 className="mb-3 text-lg font-medium text-sequoia-black">支援前の課題</h2>
              <p className="leading-relaxed text-secondary">{item.challenge}</p>
            </section>
            <section>
              <h2 className="mb-3 text-lg font-medium text-sequoia-black">支援前の状態</h2>
              <p className="leading-relaxed text-secondary">{item.beforeState}</p>
            </section>
            <section>
              <h2 className="mb-3 text-lg font-medium text-sequoia-black">Amberが実施したこと</h2>
              <p className="mb-5 leading-relaxed text-secondary">{item.support}</p>
              <ol className="space-y-3">
                {item.supportSteps.map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm leading-relaxed text-sequoia-black/80">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-light-green text-[11px] font-medium text-brand-green">
                      {index + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </section>
            <section>
              <h2 className="mb-3 text-lg font-medium text-sequoia-black">成果物</h2>
              <ul className="grid gap-2 sm:grid-cols-2">
                {item.deliverables.map((d) => (
                  <li
                    key={d}
                    className="rounded-xl border border-sequoia-black/8 bg-off-white px-4 py-3 text-sm text-sequoia-black/80"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="mb-3 text-lg font-medium text-sequoia-black">導入後の変化</h2>
              <p className="leading-relaxed text-secondary">{item.change}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="home-card border border-sequoia-black/8 bg-off-white p-5">
                  <p className="mb-2 text-xs text-secondary">支援前</p>
                  <p className="text-sm text-sequoia-black">{item.before}</p>
                </div>
                <div className="home-card border border-brand-green/15 bg-light-green p-5">
                  <p className="mb-2 text-xs text-brand-green">支援後</p>
                  <p className="text-sm text-sequoia-black">{item.after}</p>
                </div>
              </div>
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

          {others.length > 0 ? (
            <aside className="mt-16 border-t border-sequoia-black/8 pt-12">
              <h2 className="home-h3 mb-6">ほかの支援事例</h2>
              <ul className="grid gap-4 md:grid-cols-2">
                {others.map((other) => (
                  <li key={other.slug}>
                    <Link
                      href={`/cases/${other.slug}`}
                      className="home-card block border border-sequoia-black/8 bg-off-white p-5 transition-colors hover:border-brand-green/25"
                    >
                      <p className="home-label mb-2 text-brand-green">{other.industry}</p>
                      <p className="mb-2 font-medium text-sequoia-black">{other.theme}</p>
                      <p className="line-clamp-2 text-sm text-secondary">{other.summary}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}
        </div>
      </article>
      <ContactCTA source="case-detail" />
      <Footer />
    </main>
  )
}
