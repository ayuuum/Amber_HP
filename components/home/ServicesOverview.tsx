import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { offerings } from '@/data/offerings'
import { servicesSection } from '@/data/home'

export default function ServicesOverview() {
  return (
    <section id="services" className="home-section scroll-mt-24 bg-white" aria-labelledby="services-heading">
      <div className="home-container">
        <div className="mb-12 max-w-3xl md:mb-16">
          <h2 id="services-heading" className="home-h2 mb-5">
            {servicesSection.heading}
          </h2>
          <p className="home-body max-w-2xl">{servicesSection.lead}</p>
        </div>

        <ol className="divide-y divide-sequoia-black/10 border-y border-sequoia-black/10">
          {offerings.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className="group grid gap-4 py-8 transition-colors md:grid-cols-[4.5rem_minmax(0,1fr)_auto] md:items-start md:gap-8 md:py-10"
              >
                <span className="text-sm font-medium tracking-[0.14em] text-brand-green">{item.number}</span>
                <div className="min-w-0">
                  <h3 className="home-h3 mb-3 break-keep text-balance transition-colors group-hover:text-brand-green">
                    {item.title}
                  </h3>
                  <p className="mb-5 max-w-2xl text-sm leading-relaxed text-sequoia-black/75 md:text-base">
                    {item.description}
                  </p>
                  <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
                    {item.points.slice(0, 4).map((point) => (
                      <li key={point} className="text-sm text-secondary">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-green md:pt-1">
                  詳しく見る
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
