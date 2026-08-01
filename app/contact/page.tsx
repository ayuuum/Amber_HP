import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'
import ContactSection from '@/components/sections/ContactSection'
import SectionHeader from '@/components/ui/SectionHeader'
import { contactPage } from '@/data/services'
import { siteUrl } from '@/lib/site-metadata'
import FadeUp from '@/components/home/FadeUp'

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description:
    '具体的な計画が決まっていなくても構いません。現在の課題や取り組み状況を伺い、最初に検討すべきテーマを整理します。',
  alternates: { canonical: `${siteUrl}/contact` },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <PageHero
        tone="blue"
        eyebrow="お問い合わせ"
        headingLines={contactPage.hero.headingLines}
        body={contactPage.hero.body}
      />

      <section className="border-b border-sequoia-black/8 bg-off-white py-12 md:py-16">
        <div className="home-container grid gap-10 lg:grid-cols-2">
          <div>
            <FadeUp>
              <SectionHeader heading="相談可能な内容" className="mb-6 md:mb-8" />
            </FadeUp>
            <ul className="space-y-2">
              {contactPage.topics.map((topic) => (
                <li key={topic} className="flex items-center gap-2 text-sm text-sequoia-black/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-green" aria-hidden />
                  {topic}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <FadeUp>
              <SectionHeader heading="相談後の流れ" className="mb-6 md:mb-8" />
            </FadeUp>
            <ol className="space-y-4">
              {contactPage.steps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-light-green text-xs font-medium text-brand-green">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium text-sequoia-black">{step.title}</p>
                    <p className="text-sm text-secondary">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </main>
  )
}
