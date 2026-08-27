import Link from 'next/link'
import { companyTeaserSection } from '@/data/home'

export default function CompanyTeaserSection() {
  return (
    <section id="company" className="home-section scroll-mt-24 bg-white" aria-labelledby="company-teaser-heading">
      <div className="home-container">
        <div className="max-w-3xl">
          <h2 id="company-teaser-heading" className="home-h2 mb-4">
            {companyTeaserSection.heading}
          </h2>
          <p className="mb-8 text-lg font-medium text-sequoia-black md:text-xl">{companyTeaserSection.subheading}</p>
          <div className="mb-10 space-y-5">
            {companyTeaserSection.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="home-body max-w-2xl">
                {p}
              </p>
            ))}
          </div>
          <Link href={companyTeaserSection.ctaHref} className="btn-pill-outline inline-flex">
            {companyTeaserSection.cta}
          </Link>
        </div>
      </div>
    </section>
  )
}
