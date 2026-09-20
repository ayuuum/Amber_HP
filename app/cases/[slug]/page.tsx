import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageBreadcrumbs from '@/components/ui/PageBreadcrumbs'
import ContactCTA from '@/components/ui/ContactCTA'
import { getAllCaseSlugs, getCaseBySlug, isCompletedCase } from '@/data/cases'
import { siteUrl } from '@/lib/site-metadata'

type Props = { params: { slug: string } }

export const dynamicParams = false

export function generateStaticParams() {
  return getAllCaseSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const item = getCaseBySlug(params.slug)
  if (!item) return { title: 'Work | Amber' }
  return {
    title: `${item.theme} | ${item.industry}向けAI・業務変革事例`,
    description: `${item.industry}における取り組み。${item.challenge}`.slice(0, 160),
    alternates: { canonical: `${siteUrl}/cases/${item.slug}` },
  }
}

export default function CaseDetailPage({ params }: Props) {
  const item = getCaseBySlug(params.slug)
  if (!item) notFound()
  const completed = isCompletedCase(item.status)
  const outcomeLabel = completed ? '導入後の変化' : '実装伴走中の到達点'
  const afterLabel = completed ? 'After' : '進行中'

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
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-sequoia-black/10 bg-off-white px-2.5 py-0.5 text-xs text-secondary">
              {item.status}
            </span>
            {!completed ? (
              <span className="rounded-full border border-brand-green/25 bg-light-green/70 px-2.5 py-0.5 text-xs text-brand-green">
                実装・定着を伴走中
              </span>
            ) : null}
            {item.period ? (
              <span className="rounded-full border border-sequoia-black/10 bg-off-white px-2.5 py-0.5 text-xs text-secondary">
                {item.period}
              </span>
            ) : null}
            <span className="rounded-full border border-brand-green/20 bg-light-green/60 px-2.5 py-0.5 text-xs text-brand-green">
              {item.serviceLabel}
            </span>
            {item.anonymous ? (
              <span className="text-sm text-secondary">本事例は守秘義務のため、企業名を伏せて掲載しています。</span>
            ) : null}
          </div>
          <p className="mb-4 text-sm font-medium text-sequoia-black/65">{item.scaleLabel}</p>
          <h1 className="home-h2 mb-8 max-w-3xl">{item.theme}</h1>

          <div className="relative mb-12 aspect-[21/9] max-h-80 overflow-hidden rounded-2xl bg-sequoia-black/5">
            <Image src={item.image} alt={item.imageAlt} fill className="object-cover brightness-[0.88]" sizes="100vw" priority />
          </div>

          {item.outcomes && item.outcomes.length > 0 ? (
            <div className="mx-auto mb-12 max-w-3xl rounded-2xl border border-sequoia-black/8 bg-off-white p-6 md:p-8">
              <h2 className="mb-4 text-lg font-medium text-sequoia-black">ポイント</h2>
              <ul className="space-y-3">
                {item.outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-3 text-sm leading-relaxed text-sequoia-black/80 md:text-base">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green/70" aria-hidden />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mx-auto mb-12 grid max-w-3xl gap-4 sm:grid-cols-2">
            <div className="home-card border border-sequoia-black/8 bg-off-white p-5">
              <p className="mb-2 text-xs text-secondary">Before</p>
              <p className="text-sm text-sequoia-black md:text-base">{item.before}</p>
            </div>
            <div className="home-card border border-brand-green/15 bg-light-green p-5">
              <p className="mb-2 text-xs text-brand-green">{afterLabel}</p>
              <p className="text-sm text-sequoia-black md:text-base">{item.after}</p>
            </div>
          </div>

          <div className="mx-auto grid max-w-3xl gap-10">
            <section>
              <h2 className="mb-3 text-lg font-medium text-sequoia-black">業界</h2>
              <p className="leading-relaxed text-secondary">{item.industry}</p>
            </section>
            <section>
              <h2 className="mb-3 text-lg font-medium text-sequoia-black">支援テーマ</h2>
              <p className="leading-relaxed text-secondary">{item.theme}</p>
            </section>
            <section>
              <h2 className="mb-3 text-lg font-medium text-sequoia-black">支援前の課題</h2>
              <p className="leading-relaxed text-secondary">{item.challenge}</p>
            </section>
            <section>
              <h2 className="mb-3 text-lg font-medium text-sequoia-black">支援前の状態</h2>
              <p className="leading-relaxed text-secondary">{item.beforeState}</p>
            </section>
            <section>
              <h2 className="mb-3 text-lg font-medium text-sequoia-black">支援内容</h2>
              <p className="leading-relaxed text-secondary">{item.support}</p>
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
              <h2 className="mb-3 text-lg font-medium text-sequoia-black">{outcomeLabel}</h2>
              <p className="leading-relaxed text-secondary">{item.change}</p>
            </section>
            <section>
              <h2 className="mb-3 text-lg font-medium text-sequoia-black">現在進めていること</h2>
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
