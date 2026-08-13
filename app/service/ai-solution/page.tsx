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
import { environments } from '@/data/offerings'
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
  const { services, method, process } = aiSolutionPage

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
            <SectionHeader heading={services.headingLines} lead={services.lead} />
          </FadeUp>

          <FadeUp className="mb-8">
            <ol className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              {services.items.map((item, index) => (
                <li key={item.id} className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-sequoia-black/10 bg-white px-3.5 py-2 text-sm text-sequoia-black">
                    <span className="text-xs font-medium tracking-wide text-brand-green">{item.number}</span>
                    <span className="font-medium">{item.shortTitle}</span>
                  </span>
                  {index < services.items.length - 1 ? (
                    <span className="hidden text-brand-green/50 sm:inline" aria-hidden>
                      →
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          </FadeUp>

          <div className="space-y-5">
            {services.items.map((item, i) => (
              <FadeUp key={item.id} delay={0.04 * i}>
                <article
                  id={item.id}
                  className="home-card relative scroll-mt-28 border border-sequoia-black/8 bg-white p-6 md:p-8"
                >
                  {/* 旧アンカー互換 */}
                  {item.legacyIds.map((legacyId) => (
                    <span key={legacyId} id={legacyId} className="absolute -top-24" aria-hidden />
                  ))}
                  <p className="mb-3 text-xs font-medium tracking-[0.12em] text-brand-green">{item.number}</p>
                  <h3 className="home-h3 mb-3">{item.title}</h3>
                  <p className="mb-6 max-w-3xl text-sm leading-relaxed text-sequoia-black/75 md:text-base">
                    {item.description}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {item.points.map((point) => (
                      <li key={point} className="rounded-full bg-off-white px-3 py-1.5 text-xs text-sequoia-black/80 md:text-sm">
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section id="environments" className="home-section scroll-mt-24 bg-white">
        <div className="home-container">
          <FadeUp>
            <SectionHeader
              heading={aiSolutionPage.environments.heading}
              lead={aiSolutionPage.environments.lead}
            />
          </FadeUp>
          <ul className="grid gap-5 md:grid-cols-3">
            {environments.map((env, i) => (
              <FadeUp key={env.id} delay={0.04 * i}>
                <li className="home-card h-full border border-sequoia-black/8 bg-off-white p-6">
                  <h3 className="home-h3 mb-4 break-keep text-balance">{env.title}</h3>
                  <ul className="space-y-2">
                    {env.items.map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-relaxed text-sequoia-black/75">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-green/60" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </li>
              </FadeUp>
            ))}
          </ul>
        </div>
      </section>

      <section id="process" className="home-section scroll-mt-24 bg-light-blue">
        <div className="home-container">
          <FadeUp>
            <SectionHeader heading={process.headingLines} lead={process.lead} />
          </FadeUp>
          <ol className="grid gap-4 md:grid-cols-5">
            {process.stages.map((stage, index) => (
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

      <section id="method" className="home-section scroll-mt-24 bg-white">
        <div className="home-container">
          <FadeUp>
            <div className="home-card border border-sequoia-black/8 bg-off-white p-6 md:p-10">
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <h2 className="home-h2 mb-5">{method.heading}</h2>
                  <p className="home-body">{method.body}</p>
                </div>
                <ul className="space-y-3 border-t border-sequoia-black/8 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                  {method.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm text-sequoia-black/80">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green/70" aria-hidden />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeUp>
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

      <div id="ai-solution-form" className="scroll-mt-24">
        <ContactCTA
          headingLines={aiSolutionPage.finalCta.headingLines}
          body={aiSolutionPage.finalCta.body}
          ctaLabel={aiSolutionPage.finalCta.cta}
          source="ai-solution-final"
        />
      </div>
      <Footer />
    </main>
  )
}
