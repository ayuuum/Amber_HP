'use client'

import Link from 'next/link'
import { useMessages } from '@/components/i18n/LocaleProvider'

export default function CompanyTeaserSection() {
  const t = useMessages().home.company

  return (
    <section id="company" className="home-section scroll-mt-24 bg-white" aria-labelledby="company-teaser-heading">
      <div className="home-container">
        <div className="max-w-3xl">
          <h2 id="company-teaser-heading" className="home-h2 mb-4">
            {t.heading}
          </h2>
          <p className="mb-8 text-lg font-medium text-sequoia-black md:text-xl">{t.subheading}</p>
          <div className="mb-10 space-y-5">
            {t.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="home-body max-w-2xl">
                {p}
              </p>
            ))}
          </div>
          <Link href="/company" className="btn-pill-outline inline-flex">
            {t.cta}
          </Link>
        </div>
      </div>
    </section>
  )
}
