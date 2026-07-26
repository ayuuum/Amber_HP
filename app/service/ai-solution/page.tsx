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
  title: 'AIソリューション | 構想から現場の成果まで',
  description:
    'AI活用の優先順位づけ、実務研修、AIエージェント・システム開発、導入後の定着まで。Amberは企業ごとの業務に入り込み、使われ続ける仕組みを実装します。',
  alternates: { canonical: `${siteUrl}/service/ai-solution` },
  openGraph: {
    title: 'AIソリューション | 構想から現場の成果まで',
    description: '研修だけで終わらせない。構想から定着まで一気通貫で支援します。',
    url: `${siteUrl}/service/ai-solution`,
    type: 'website',
  },
}

const toneClass = {
  green: 'bento-tone-green',
  blue: 'bento-tone-blue',
  amber: 'bento-tone-amber',
  gray: 'bento-tone-gray',
} as const

export default function AiSolutionPage() {
  const contactHref = buildContactHref('ai-solution', 'ai-solution')

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <PageHero
        tone="green"
        eyebrow="AI Solution"
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
            <SectionHeader heading={aiSolutionPage.services.headingLines} />
          </FadeUp>
          <div className="grid gap-4 md:grid-cols-2">
            {aiSolutionPage.services.items.map((service, i) => (
              <FadeUp key={service.id} delay={0.05 * i}>
                <article className={`home-card flex h-full flex-col p-6 md:p-8 ${toneClass[service.tone]}`}>
                  <h3 className="home-h3 mb-3">{service.title}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-sequoia-black/75 md:text-base">{service.description}</p>
                  <p className="mb-3 text-xs font-medium tracking-wide text-secondary">含む内容</p>
                  <ul className="flex flex-wrap gap-2">
                    {service.outcomes.map((o) => (
                      <li key={o} className="rounded-full bg-white/70 px-3 py-1 text-xs text-sequoia-black/80">
                        {o}
                      </li>
                    ))}
                  </ul>
                </article>
              </FadeUp>
            ))}
          </div>
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

      <section className="home-section bg-white">
        <div className="home-container">
          <FadeUp>
            <SectionHeader heading={aiSolutionPage.comparison.heading} lead={aiSolutionPage.comparison.lead} />
          </FadeUp>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-sequoia-black/10 text-left">
                  <th className="py-3 pr-4 font-medium text-sequoia-black">支援方法</th>
                  <th className="py-3 px-2 font-medium text-sequoia-black">研修</th>
                  <th className="py-3 px-2 font-medium text-sequoia-black">業務設計</th>
                  <th className="py-3 px-2 font-medium text-sequoia-black">開発</th>
                  <th className="py-3 px-2 font-medium text-sequoia-black">導入後改善</th>
                </tr>
              </thead>
              <tbody>
                {aiSolutionPage.comparison.rows.map((row) => (
                  <tr key={row.method} className="border-b border-sequoia-black/8">
                    <td className={`py-3 pr-4 ${row.method === 'Amber' ? 'font-medium text-brand-green' : 'text-sequoia-black'}`}>
                      {row.method}
                    </td>
                    <td className="py-3 px-2 text-center text-secondary">{row.training}</td>
                    <td className="py-3 px-2 text-center text-secondary">{row.design}</td>
                    <td className="py-3 px-2 text-center text-secondary">{row.build}</td>
                    <td className="py-3 px-2 text-center text-secondary">{row.improve}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

      {/* 既存広告CV用フォームアンカー互換 */}
      <section id="ai-solution-form" className="scroll-mt-24 border-t border-sequoia-black/8 bg-light-green/40 py-16">
        <div className="home-container text-center">
          <h2 className="home-h3 mb-4">AI活用について相談する</h2>
          <p className="home-body mx-auto mb-8 max-w-xl">
            お問い合わせフォームからご連絡ください。課題の整理からご相談いただけます。
          </p>
          <Link href={contactHref} className="btn-pill-primary-solid inline-flex">
            お問い合わせフォームへ
          </Link>
        </div>
      </section>

      <ContactCTA
        headingLines={aiSolutionPage.finalCta.headingLines}
        ctaLabel={aiSolutionPage.finalCta.cta}
        source="ai-solution-final"
      />
      <Footer />
    </main>
  )
}
