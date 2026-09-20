import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'
import ContactCTA from '@/components/ui/ContactCTA'
import PageBreadcrumbs from '@/components/ui/PageBreadcrumbs'
import { cases, isCompletedCase } from '@/data/cases'
import { siteUrl } from '@/lib/site-metadata'

export const metadata: Metadata = {
  title: 'Work | 製造・設備・現場向け AI活用・業務変革事例',
  description:
    '製造・素材・化学、設備点検、訪問現場サービスなど、暮らしを支える産業でのAI活用・業務基盤の取り組み事例。守秘のため企業名は非公開です。',
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
      <section id="case-list" className="scroll-mt-24 bg-white py-12 md:py-16 lg:py-20">
        <div className="home-container">
          <PageBreadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Work' }]} />
          <div className="mb-8 md:mb-10">
            <h2 className="home-h2 mb-3">支援事例</h2>
            <p className="home-body max-w-2xl text-pretty">
              現場業務の再設計から、AI活用基盤、訪問オペの統合まで。進行中の案件は「実装伴走中」と明示しています。
            </p>
          </div>
          <ul className="grid gap-8 md:gap-10">
            {cases.map((item) => {
              const completed = isCompletedCase(item.status)
              return (
                <li key={item.slug}>
                  <article className="overflow-hidden rounded-sm border border-sequoia-black/10 bg-white shadow-[0_1px_0_rgba(21,40,40,0.04)] md:grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                    <div className="relative aspect-[16/10] bg-off-white md:aspect-auto md:min-h-[280px]">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                    </div>
                    <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <p className="home-label text-brand-green">{item.enIndustry}</p>
                        <span className="rounded-full border border-sequoia-black/10 bg-off-white px-2.5 py-0.5 text-[11px] text-secondary">
                          {item.status}
                        </span>
                        {!completed ? (
                          <span className="rounded-full border border-brand-green/25 bg-light-green/60 px-2.5 py-0.5 text-[11px] text-brand-green">
                            実装伴走中
                          </span>
                        ) : null}
                        {item.period ? (
                          <span className="text-[11px] text-secondary">{item.period}</span>
                        ) : null}
                      </div>
                      <p className="mb-2 text-sm text-sequoia-black/60">{item.scaleLabel}</p>
                      <h3 className="home-h3 mb-3">{item.theme}</h3>
                      <p className="home-body mb-5 max-w-2xl text-pretty">{item.challenge}</p>
                      {item.outcomes && item.outcomes.length > 0 ? (
                        <ul className="mb-6 space-y-2 border-t border-sequoia-black/8 pt-4">
                          {item.outcomes.slice(0, 2).map((outcome) => (
                            <li key={outcome} className="flex gap-2 text-sm leading-relaxed text-sequoia-black/75">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green/70" aria-hidden />
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      <div className="mb-6 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-sm border border-sequoia-black/8 bg-off-white px-4 py-3">
                          <p className="mb-1 text-[11px] tracking-wide text-secondary">Before</p>
                          <p className="text-sm text-sequoia-black">{item.before}</p>
                        </div>
                        <div className="rounded-sm border border-brand-green/15 bg-light-green/50 px-4 py-3">
                          <p className="mb-1 text-[11px] tracking-wide text-brand-green">
                            {completed ? 'After' : '進行中'}
                          </p>
                          <p className="text-sm text-sequoia-black">{item.after}</p>
                        </div>
                      </div>
                      <Link
                        href={`/cases/${item.slug}`}
                        className="inline-flex min-h-11 w-fit items-center gap-1.5 text-sm font-medium text-brand-green hover:underline"
                      >
                        詳細を見る
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </Link>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
      <ContactCTA source="cases" headingLines={['一緒に整理します。']} />
      <Footer />
    </main>
  )
}
