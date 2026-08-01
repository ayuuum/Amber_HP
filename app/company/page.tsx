import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'
import SectionHeader from '@/components/ui/SectionHeader'
import ContactCTA from '@/components/ui/ContactCTA'
import CompanyContactRedirect from './CompanyContactRedirect'
import { companyPage } from '@/data/services'
import { buildContactHref } from '@/lib/contact'
import { siteUrl } from '@/lib/site-metadata'
import FadeUp from '@/components/home/FadeUp'

export const metadata: Metadata = {
  title: '会社情報',
  description: '現場が回り続ける仕組みを、技術で実装する。株式会社Amberのミッション、原則、代表、会社概要。',
  alternates: { canonical: `${siteUrl}/company` },
}

export default function CompanyPage() {
  return (
    <main className="min-h-screen bg-white">
      <CompanyContactRedirect />
      <Header />
      <PageHero
        tone="dark"
        eyebrow="Company"
        headingLines={companyPage.hero.headingLines}
        body={companyPage.hero.body}
        image={{ src: '/images/about-mission-mountain.png', alt: 'Amberのミッションを表すイメージ' }}
      />

      <section className="home-section bg-white">
        <div className="home-container">
          <FadeUp>
            <SectionHeader heading={companyPage.mission.headingLines} />
          </FadeUp>
          <div className="max-w-2xl space-y-5">
            {companyPage.mission.paragraphs.map((p) => (
              <p key={p.slice(0, 20)} className="text-base leading-[1.9] text-secondary">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section bg-off-white">
        <div className="home-container">
          <FadeUp>
            <SectionHeader heading="Amberの原則" />
          </FadeUp>
          <ul className="grid gap-6 md:grid-cols-2">
            {companyPage.principles.map((item) => (
              <li key={item.title} className="border-t border-sequoia-black/10 pt-5">
                <h3 className="mb-2 text-lg font-medium text-sequoia-black">{item.title}</h3>
                <p className="text-sm leading-relaxed text-secondary md:text-base">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-section bg-white">
        <div className="home-container">
          <FadeUp>
            <SectionHeader heading="代表紹介" />
          </FadeUp>
          <div className="home-card grid gap-8 border border-sequoia-black/8 bg-off-white p-6 md:grid-cols-[240px_1fr] md:p-8">
            <div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src={companyPage.representative.photo}
                  alt={`${companyPage.representative.title} ${companyPage.representative.name}の写真`}
                  fill
                  className="object-cover"
                  sizes="240px"
                />
              </div>
              <p className="mt-4 font-medium text-sequoia-black">{companyPage.representative.name}</p>
              <p className="text-sm text-secondary">{companyPage.representative.title}</p>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-secondary md:text-base">
              {companyPage.representative.bio.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="home-section bg-light-green/40">
        <div className="home-container">
          <FadeUp>
            <SectionHeader heading="会社概要" />
          </FadeUp>
          <dl className="home-card divide-y divide-sequoia-black/8 border border-sequoia-black/8 bg-white">
            {companyPage.profile.map((row) => (
              <div key={row.label} className="grid gap-2 px-6 py-5 md:grid-cols-[160px_1fr]">
                <dt className="text-sm font-medium text-secondary">{row.label}</dt>
                <dd className="text-sm leading-relaxed text-sequoia-black md:text-base">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="home-section bg-white">
        <div className="home-container text-center">
          <h2 className="home-h3 mb-4">Amberへの相談・協業について</h2>
          <p className="home-body mx-auto mb-8 max-w-xl">
            AI活用支援、協業、その他のご相談はお問い合わせフォームよりご連絡ください。
          </p>
          <Link href={buildContactHref('company')} className="btn-pill-primary-solid inline-flex">
            お問い合わせ
          </Link>
        </div>
      </section>

      <ContactCTA source="company" />
      <Footer />
    </main>
  )
}
