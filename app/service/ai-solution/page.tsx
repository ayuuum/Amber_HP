import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'
import SectionHeader from '@/components/ui/SectionHeader'
import CaseStudyCard from '@/components/ui/CaseStudyCard'
import ContactCTA from '@/components/ui/ContactCTA'
import FaqAccordion from '@/components/ui/FaqAccordion'
import { aiSolutionPage } from '@/data/services'
import { cases } from '@/data/cases'
import { buildContactHref } from '@/lib/contact'
import { siteUrl } from '@/lib/site-metadata'
import FadeUp from '@/components/home/FadeUp'

export const metadata: Metadata = {
  title: aiSolutionPage.meta.title,
  description: aiSolutionPage.meta.description,
  alternates: { canonical: `${siteUrl}/service/ai-solution` },
  openGraph: {
    title: aiSolutionPage.meta.ogTitle,
    description: aiSolutionPage.meta.description,
    url: `${siteUrl}/service/ai-solution`,
    type: 'website',
  },
}

export default function AiSolutionPage() {
  const contactHref = buildContactHref('ai-solution', 'ai-solution')
  const { journey, scope, fde } = aiSolutionPage

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <PageHero
        tone="green"
        eyebrow={aiSolutionPage.hero.eyebrow}
        headingLines={aiSolutionPage.hero.headingLines}
        body={aiSolutionPage.hero.body}
        primaryCta={{ label: aiSolutionPage.hero.primaryCta, href: contactHref }}
        secondaryCta={{ label: aiSolutionPage.hero.secondaryCta, href: aiSolutionPage.hero.secondaryHref }}
        image={{ src: '/images/brand/consulting-hero.png', alt: '現場の机に置かれたタブレットとノート' }}
      />

      <section className="home-section bg-white">
        <div className="home-container">
          <FadeUp>
            <SectionHeader heading={aiSolutionPage.challenges.headingLines} />
          </FadeUp>
          <ul className="grid gap-4 md:grid-cols-2">
            {aiSolutionPage.challenges.items.map((item, i) => (
              <FadeUp key={item} delay={0.04 * i}>
                <li className="home-card border border-sequoia-black/8 bg-off-white px-5 py-5 text-sm leading-relaxed text-sequoia-black/85 md:text-base">
                  {item}
                </li>
              </FadeUp>
            ))}
          </ul>
        </div>
      </section>

      <section id="services" className="home-section scroll-mt-24 bg-off-white">
        <div className="home-container">
          <FadeUp>
            <SectionHeader heading={journey.headingLines} lead={journey.lead} />
          </FadeUp>

          {/* STEP 1 — 入口 */}
          <FadeUp>
            <article
              id={journey.step1.id}
              className="home-card scroll-mt-28 mb-5 border border-brand-green/20 bg-light-green p-6 md:p-10"
            >
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <p className="text-xs font-medium tracking-[0.12em] text-brand-green">{journey.step1.step}</p>
                <span className="rounded-full border border-brand-green/25 bg-white/70 px-2.5 py-0.5 text-[11px] font-medium text-brand-green">
                  まずはこちらから
                </span>
              </div>
              <h3 className="home-h3 mb-3">{journey.step1.title}</h3>
              <p className="mb-6 max-w-3xl text-sm leading-relaxed text-sequoia-black/75 md:text-base">
                {journey.step1.description}
              </p>
              <p className="mb-3 text-xs font-medium tracking-wide text-secondary">成果物</p>
              <ul className="mb-6 flex flex-wrap gap-2">
                {journey.step1.outcomes.map((o) => (
                  <li key={o} className="rounded-full bg-white/80 px-3 py-1 text-xs text-sequoia-black/80">
                    {o}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-secondary">このような企業に向いています：{journey.step1.fit}</p>
            </article>
          </FadeUp>

          {/* STEP 2 — 並列の実行選択肢 */}
          <div className="mb-5">
            <FadeUp className="mb-4 md:mb-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <p className="text-xs font-medium tracking-[0.12em] text-brand-green">{journey.step2Label}</p>
                <p className="max-w-xl text-sm text-secondary">{journey.step2Lead}</p>
              </div>
            </FadeUp>
            <div className="grid gap-5 md:grid-cols-2">
              {[journey.step2a, journey.step2b].map((step, i) => (
                <FadeUp key={step.id} delay={0.05 * i}>
                  <article
                    id={step.id}
                    className="home-card flex h-full scroll-mt-28 flex-col border border-sequoia-black/8 bg-white p-6 md:p-8"
                  >
                    <h3 className="home-h3 mb-3">{step.title}</h3>
                    <p className="mb-6 text-sm leading-relaxed text-sequoia-black/75 md:text-base">{step.description}</p>
                    <ul className="mb-6 flex flex-wrap gap-2">
                      {step.outcomes.map((o) => (
                        <li key={o} className="rounded-full bg-off-white px-3 py-1 text-xs text-sequoia-black/80">
                          {o}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-auto text-sm text-secondary">このような企業に向いています：{step.fit}</p>
                  </article>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* STEP 3 */}
          <FadeUp>
            <article
              id={journey.step3.id}
              className="home-card scroll-mt-28 border border-sequoia-black/8 bg-light-blue p-6 md:p-8"
            >
              <p className="mb-3 text-xs font-medium tracking-[0.12em] text-brand-green">{journey.step3.step}</p>
              <h3 className="home-h3 mb-3">{journey.step3.title}</h3>
              <p className="mb-6 max-w-3xl text-sm leading-relaxed text-sequoia-black/75 md:text-base">
                {journey.step3.description}
              </p>
              <ul className="mb-6 flex flex-wrap gap-2">
                {journey.step3.outcomes.map((o) => (
                  <li key={o} className="rounded-full bg-white/80 px-3 py-1 text-xs text-sequoia-black/80">
                    {o}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-secondary">このような企業に向いています：{journey.step3.fit}</p>
            </article>
          </FadeUp>

          {/* FDE — 横断スタイル（STEPではない） */}
          <FadeUp className="mt-8">
            <aside
              id="fde"
              className="relative overflow-hidden rounded-2xl border border-dashed border-brand-green/30 bg-white px-6 py-8 md:px-10"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-green/40 to-transparent" aria-hidden />
              <p className="home-label mb-3 text-brand-green">{fde.label}</p>
              <h3 className="mb-3 text-lg font-medium text-sequoia-black md:text-xl">{fde.heading}</h3>
              <p className="max-w-3xl text-sm leading-relaxed text-secondary md:text-base">{fde.body}</p>
            </aside>
          </FadeUp>
        </div>
      </section>

      <section className="home-section bg-white">
        <div className="home-container">
          <FadeUp>
            <SectionHeader heading={scope.headingLines} lead={scope.lead} />
          </FadeUp>
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {scope.phases.map((phase, index) => (
              <FadeUp key={phase.title} delay={0.04 * index}>
                <li className="home-card relative h-full border border-sequoia-black/8 bg-off-white p-5">
                  <p className="mb-3 text-xs font-medium tracking-[0.12em] text-brand-green">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mb-2 text-base font-medium text-sequoia-black">{phase.title}</h3>
                  <p className="text-sm text-secondary">{phase.description}</p>
                  {index < scope.phases.length - 1 ? (
                    <span
                      className="pointer-events-none absolute -right-2 top-1/2 hidden h-px w-4 -translate-y-1/2 bg-brand-green/30 lg:block"
                      aria-hidden
                    />
                  ) : null}
                </li>
              </FadeUp>
            ))}
          </ol>
        </div>
      </section>

      <section id="process" className="home-section scroll-mt-24 bg-light-blue">
        <div className="home-container">
          <FadeUp>
            <SectionHeader heading={aiSolutionPage.process.headingLines} />
          </FadeUp>
          <ol className="grid gap-4 md:grid-cols-5">
            {aiSolutionPage.process.stages.map((stage, index) => (
              <FadeUp key={stage.title} delay={0.04 * index}>
                <li className="home-card h-full border border-sequoia-black/6 bg-white p-5">
                  <p className="mb-2 text-xs font-medium tracking-[0.1em] text-brand-green">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mb-4 text-base font-medium text-sequoia-black">{stage.title}</h3>
                  <dl className="space-y-3 text-xs leading-relaxed">
                    <div>
                      <dt className="text-secondary">顧客</dt>
                      <dd className="mt-0.5 text-sequoia-black/80">{stage.customer}</dd>
                    </div>
                    <div>
                      <dt className="text-secondary">Amber</dt>
                      <dd className="mt-0.5 text-sequoia-black/80">{stage.amber}</dd>
                    </div>
                  </dl>
                </li>
              </FadeUp>
            ))}
          </ol>
        </div>
      </section>

      <section className="home-section bg-off-white">
        <div className="home-container">
          <FadeUp className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
            <SectionHeader heading="支援事例" className="mb-0 md:mb-0" />
            <Link href="/cases" className="text-sm font-medium text-brand-green hover:underline">
              一覧を見る
            </Link>
          </FadeUp>
          <ul className="grid gap-5 md:grid-cols-3">
            {cases.map((item) => (
              <li key={item.slug}>
                <CaseStudyCard item={item} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-section bg-white">
        <div className="home-container">
          <FadeUp>
            <SectionHeader heading="よくあるご質問" />
          </FadeUp>
          <FaqAccordion items={aiSolutionPage.faq.map((f) => ({ question: f.q, answer: f.a }))} />
        </div>
      </section>

      {/* 広告CV互換アンカー + 重複CTA統合 */}
      <div id="ai-solution-form" className="scroll-mt-24">
        <ContactCTA
          headingLines={aiSolutionPage.finalCta.headingLines}
          body={aiSolutionPage.finalCta.body}
          ctaLabel={aiSolutionPage.finalCta.cta}
          source="ai-solution-final"
          note={aiSolutionPage.finalCta.note}
        />
      </div>
      <Footer />
    </main>
  )
}
