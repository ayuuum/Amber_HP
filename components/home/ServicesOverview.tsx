import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { offerings } from '@/data/offerings'

/** 下層ページ用。TOPでは WhatWeDoSection を使用。 */
export default function ServicesOverview() {
  return (
    <section id="services" className="home-section scroll-mt-24 bg-white" aria-labelledby="services-heading">
      <div className="home-container">
        <div className="mb-10 max-w-3xl md:mb-14">
          <h2 id="services-heading" className="home-h2 mb-5">
            From Operations to Software.
          </h2>
          <p className="home-body max-w-2xl">
            ツール導入にとどまらず、業務理解から実装・改善まで一貫して取り組みます。
          </p>
        </div>

        <ol className="divide-y divide-sequoia-black/10 border-y border-sequoia-black/10">
          {offerings.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className="group grid gap-4 py-8 transition-colors md:grid-cols-[4.5rem_minmax(0,1fr)_auto] md:items-start md:gap-8 md:py-9"
              >
                <span className="text-sm font-medium tracking-[0.14em] text-brand-green">{item.number}</span>
                <div className="min-w-0">
                  <h3 className="home-h3 mb-2 break-keep text-balance transition-colors group-hover:text-brand-green">
                    {item.title}
                  </h3>
                  <p className="mb-3 text-sm text-secondary">{item.shortTitle}</p>
                  <p className="mb-5 max-w-2xl text-sm leading-relaxed text-sequoia-black/75 md:text-base">
                    {item.description}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-green md:pt-1">
                  View
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
