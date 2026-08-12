import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactSection from '@/components/sections/ContactSection'
import { contactPage } from '@/data/services'
import { siteUrl } from '@/lib/site-metadata'

export const metadata: Metadata = {
  title: 'お問い合わせ | AI活用の進め方を一緒に整理します',
  description:
    '具体的な計画が決まっていなくても構いません。現在の課題や取り組み状況を伺い、最初に検討すべきテーマを整理します。',
  alternates: { canonical: `${siteUrl}/contact` },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <ContactSection asPage />

      <section className="border-t border-sequoia-black/8 bg-off-white py-12 md:py-16">
        <div className="home-container">
          <h2 className="mb-8 text-lg font-medium text-sequoia-black md:mb-10 md:text-xl">
            相談後の流れ
          </h2>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactPage.steps.map((step, i) => (
              <li key={step.title} className="flex gap-3 sm:flex-col sm:gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-light-green text-xs font-medium text-brand-green">
                  {i + 1}
                </span>
                <div>
                  <p className="font-medium text-sequoia-black">{step.title}</p>
                  <p className="mt-1 text-sm text-secondary">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Footer />
    </main>
  )
}
