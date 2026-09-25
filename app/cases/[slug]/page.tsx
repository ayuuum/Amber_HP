import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageBreadcrumbs from '@/components/ui/PageBreadcrumbs'
import ContactCTA from '@/components/ui/ContactCTA'
import { getAllCaseSlugs, getCaseBySlug, caseStatusLabel, isCompletedCase } from '@/data/cases'
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
  const outcomeLabel = completed ? 'Outcome' : 'Progress'
  const afterLabel = completed ? 'After' : 'In progress'

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <article className="pt-28 md:pt-32">
        <div className="home-container pb-16 md:pb-24">
          <div className="mx-auto max-w-3xl">
            <PageBreadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Work', href: '/cases' },
                { label: item.theme },
              ]}
            />
            <p className="home-label mb-3 text-brand-green">{item.industry}</p>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-sequoia-black/10 bg-off-white px-2.5 py-0.5 text-xs text-secondary">
                {caseStatusLabel[item.status]}
              </span>
              {!completed ? (
                <span className="rounded-full border border-brand-green/25 bg-light-green/70 px-2.5 py-0.5 text-xs text-brand-green">
                  In delivery
                </span>
              ) : null}
              {item.period && item.period !== '進行中' ? (
                <span className="rounded-full border border-sequoia-black/10 bg-off-white px-2.5 py-0.5 text-xs text-secondary">
                  {item.period}
                </span>
              ) : null}
              <span className="rounded-full border border-brand-green/20 bg-light-green/60 px-2.5 py-0.5 text-xs text-brand-green">
                {item.serviceLabel}
              </span>
            </div>
            {item.anonymous ? (
              <p className="mb-4 text-sm text-secondary">
                本事例は守秘義務のため、企業名を伏せて掲載しています。
              </p>
            ) : null}
            <p className="mb-3 text-sm font-medium text-sequoia-black/65">{item.scaleLabel}</p>
            <h1 className="mb-8 max-w-2xl text-balance text-2xl font-medium leading-snug tracking-tight text-sequoia-black md:text-3xl lg:text-[2rem]">
              {item.theme}
            </h1>

            <div className="relative mb-10 aspect-[16/10] overflow-hidden rounded-xl bg-sequoia-black/5">
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>

            {item.outcomes && item.outcomes.length > 0 ? (
              <div className="mb-10 rounded-xl border border-sequoia-black/8 bg-off-white p-5 md:p-6">
                <h2 className="mb-4 text-base font-medium text-sequoia-black md:text-lg">ポイント</h2>
                <ul className="space-y-3">
                  {item.outcomes.map((outcome) => (
                    <li
                      key={outcome}
                      className="flex gap-3 text-sm leading-relaxed text-sequoia-black/80 md:text-base"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green/70" aria-hidden />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mb-12 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-sequoia-black/8 bg-off-white p-5">
                <p className="mb-2 text-xs text-secondary">Before</p>
                <p className="text-sm text-sequoia-black md:text-base">{item.before}</p>
              </div>
              <div className="rounded-xl border border-brand-green/15 bg-light-green/50 p-5">
                <p className="mb-2 text-xs text-brand-green">{afterLabel}</p>
                <p className="text-sm text-sequoia-black md:text-base">{item.after}</p>
              </div>
            </div>

            <div className="grid gap-10">
              <section>
                <h2 className="mb-3 text-lg font-medium text-sequoia-black">Industry</h2>
                <p className="leading-relaxed text-secondary">{item.industry}</p>
              </section>
              <section>
                <h2 className="mb-3 text-lg font-medium text-sequoia-black">Theme</h2>
                <p className="leading-relaxed text-secondary">{item.theme}</p>
              </section>
              <section>
                <h2 className="mb-3 text-lg font-medium text-sequoia-black">Challenge</h2>
                <p className="leading-relaxed text-secondary">{item.challenge}</p>
              </section>
              <section>
                <h2 className="mb-3 text-lg font-medium text-sequoia-black">Before</h2>
                <p className="leading-relaxed text-secondary">{item.beforeState}</p>
              </section>
              <section>
                <h2 className="mb-3 text-lg font-medium text-sequoia-black">What we did</h2>
                <p className="leading-relaxed text-secondary">{item.support}</p>
              </section>
              <section>
                <h2 className="mb-3 text-lg font-medium text-sequoia-black">Deliverables</h2>
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
                <h2 className="mb-3 text-lg font-medium text-sequoia-black">Next</h2>
                <p className="leading-relaxed text-secondary">{item.nextSteps}</p>
              </section>
              <section>
                <h2 className="mb-3 text-lg font-medium text-sequoia-black">Related</h2>
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
        </div>
      </article>
      <ContactCTA source="case-detail" />
      <Footer />
    </main>
  )
}
