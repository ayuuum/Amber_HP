import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CompanyContactRedirect from './CompanyContactRedirect'
import { companyPage } from '@/data/services'
import { buildContactHref } from '@/lib/contact'
import { siteUrl } from '@/lib/site-metadata'
import FadeUp from '@/components/home/FadeUp'

export const metadata: Metadata = {
  title: 'Company | Essential Industries × Technology',
  description:
    '暮らしを支える産業に、最新のテクノロジーを。株式会社Amberのミッション、原則、代表、会社概要。',
  alternates: { canonical: `${siteUrl}/company` },
}

export default function CompanyPage() {
  const contactHref = buildContactHref('company')
  const { hero, mission, principles, representative, profile, cta } = companyPage

  return (
    <main className="min-h-screen bg-white">
      <CompanyContactRedirect />
      <Header />

      {/* Hero — full-bleed */}
      <section className="relative flex min-h-[70vh] items-end md:min-h-[828px] md:items-center">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={hero.image}
            alt={hero.imageAlt}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.28)_0%,rgba(0,0,0,0.38)_55%,rgba(0,0,0,0.48)_100%),linear-gradient(0deg,rgba(16,51,45,0.55)_0%,rgba(16,51,45,0.18)_45%,rgba(16,51,45,0.4)_100%)]"
            aria-hidden
          />
        </div>

        <div className="home-container relative z-10 w-full pb-16 pt-28 md:pb-24 md:pt-32">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium tracking-[0.08em] text-white md:text-base">
              {hero.brand}
            </p>
            <h1 className="home-hero-title mb-5 md:mb-6">{hero.heading}</h1>
            <p className="mb-4 max-w-2xl text-lg font-medium leading-relaxed !text-white md:text-xl">
              {hero.subheading}
            </p>
            <p className="mb-10 max-w-2xl text-base leading-[1.9] !text-white">{hero.body}</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href={contactHref} className="btn-pill-on-dark w-full sm:w-auto">
                {hero.primaryCta}
              </Link>
              <Link href={hero.secondaryHref} className="btn-pill-ghost-on-dark w-full sm:w-auto">
                {hero.secondaryCta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission — body-led, no repeated tagline */}
      <section className="home-section bg-white" aria-labelledby="company-mission-heading">
        <div className="home-container">
          <FadeUp>
            <div className="max-w-3xl">
              <h2 id="company-mission-heading" className="home-h2 mb-8 md:mb-10">
                {mission.lead}
              </h2>
              <div className="space-y-5">
                {mission.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="home-body max-w-2xl text-pretty">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Principles — large typography list */}
      <section className="home-section bg-off-white" aria-labelledby="company-principles-heading">
        <div className="home-container">
          <FadeUp>
            <div className="mb-12 max-w-3xl md:mb-16">
              <h2 id="company-principles-heading" className="home-h2 mb-5">
                {principles.heading}
              </h2>
              <p className="home-body max-w-2xl">{principles.lead}</p>
            </div>
          </FadeUp>

          <ol className="divide-y divide-sequoia-black/10 border-y border-sequoia-black/10">
            {principles.items.map((item, index) => (
              <li
                key={item.title}
                className="grid gap-4 py-8 md:grid-cols-[4.5rem_minmax(0,1fr)] md:gap-10 md:py-10"
              >
                <span className="font-medium tabular-nums text-secondary/70 md:text-lg">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="mb-2 text-xl font-medium text-sequoia-black md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="max-w-2xl text-sm leading-relaxed text-secondary md:text-base">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Representative — no card */}
      <section className="home-section bg-white" aria-labelledby="company-rep-heading">
        <div className="home-container">
          <FadeUp>
            <p className="home-label mb-4">{representative.heading}</p>
            <h2 id="company-rep-heading" className="home-h2 mb-10 md:mb-14">
              {representative.name}
            </h2>
          </FadeUp>

          <div className="grid items-start gap-8 md:grid-cols-[180px_minmax(0,1fr)] md:gap-12 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16">
            <div className="w-40 md:w-full">
              <div className="relative aspect-[4/5] overflow-hidden bg-off-white">
                <Image
                  src={representative.photo}
                  alt={`${representative.title} ${representative.name}の写真`}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 160px, 200px"
                />
              </div>
              <p className="mt-3 text-sm text-secondary">{representative.title}</p>
            </div>
            <div className="space-y-5 pt-1">
              {representative.bio.map((p) => (
                <p key={p.slice(0, 24)} className="home-body max-w-2xl text-pretty">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Profile — simple definition list */}
      <section className="home-section bg-off-white" aria-labelledby="company-profile-heading">
        <div className="home-container">
          <FadeUp>
            <h2 id="company-profile-heading" className="home-h2 mb-10 md:mb-14">
              {profile.heading}
            </h2>
          </FadeUp>

          <dl className="max-w-3xl divide-y divide-sequoia-black/10 border-y border-sequoia-black/10">
            {profile.rows.map((row) => (
              <div
                key={row.label}
                className="grid gap-2 py-5 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-8 md:py-6"
              >
                <dt className="text-sm text-secondary">{row.label}</dt>
                <dd className="text-sm leading-relaxed text-sequoia-black md:text-base">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Single CTA */}
      <section className="relative overflow-hidden" aria-labelledby="company-cta-heading">
        <div className="absolute inset-0">
          <Image
            src="/images/brand/method-forest.jpg"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            aria-hidden
          />
          <div className="absolute inset-0 bg-dark-green/70" aria-hidden />
        </div>
        <div className="home-container relative z-10 py-16 md:py-20 lg:py-[7.5rem]">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="company-cta-heading" className="home-h2 mb-6 !text-white">
              {cta.heading}
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-base leading-[1.625] !text-white">{cta.body}</p>
            <Link
              href={contactHref}
              className="btn-pill-primary-solid inline-flex min-h-12 w-full px-8 sm:w-auto"
            >
              {cta.label}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
