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
  const { services, process } = aiSolutionPage

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <PageHero
        tone="dark"
        eyebrow={aiSolutionPage.hero.eyebrow}
        headingLines={aiSolutionPage.hero.headingLines}
        subheading={aiSolutionPage.hero.subheading}
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

      <section id="services" className="home-section scroll-mt-24 bg-[#F3F4F6]">
        <div className="home-container">
          <FadeUp>
            <SectionHeader heading={services.headingLines} lead={services.lead} />
          </FadeUp>

          <ol className="divide-y divide-sequoia-black/10 border-y border-sequoia-black/10 bg-white">
            {services.items.map((item, i) => (
              <li key={item.id} id={item.id} className="relative scroll-mt-28">
                {item.legacyIds.map((legacyId) => (
                  <span key={legacyId} id={legacyId} className="absolute -top-24" aria-hidden />
                ))}
                <FadeUp delay={0.04 * i}>
                  <div className="grid gap-8 px-5 py-10 md:grid-cols-[minmax(0,0.28fr)_minmax(0,0.72fr)] md:gap-12 md:px-10 md:py-14 lg:gap-16">
                    <div>
                      <p className="mb-3 text-[clamp(2.5rem,5vw,3.5rem)] font-medium leading-none tracking-tight text-brand-green/80">
                        {item.number}
                      </p>
                      <p className="text-sm font-medium text-sequoia-black/50">{item.title}</p>
                    </div>
                    <div className="min-w-0">
                      <h3 className="mb-4 text-xl font-medium text-sequoia-black md:text-2xl">{item.shortTitle}</h3>
                      <p className="mb-8 max-w-2xl text-base leading-relaxed text-secondary md:text-lg">
                        {item.description}
                      </p>
                      <ul className="space-y-3 border-t border-sequoia-black/10 pt-6">
                        {item.points.map((point) => (
                          <li
                            key={point}
                            className="flex gap-3 text-sm leading-relaxed text-sequoia-black/80 md:text-base"
                          >
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-green" aria-hidden />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeUp>
              </li>
            ))}
          </ol>
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
          <ul className="grid gap-10 border-t border-sequoia-black/10 pt-10 md:grid-cols-3 md:gap-8">
            {environments.map((env, i) => (
              <FadeUp key={env.id} delay={0.04 * i}>
                <li className="min-w-0">
                  <h3 className="mb-4 break-keep text-balance text-lg font-medium text-sequoia-black">
                    {env.title}
                  </h3>
                  <ul className="divide-y divide-sequoia-black/10 border-y border-sequoia-black/10">
                    {env.items.map((item) => (
                      <li key={item} className="py-3 text-sm leading-relaxed text-sequoia-black/80">
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
          <p className="mt-8 text-sm text-secondary">
            セキュリティとデータの取り扱いについては{' '}
            <Link href="/security" className="text-brand-green underline-offset-2 hover:underline">
              セキュリティページ
            </Link>
            もご覧ください。
          </p>
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
