'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cases } from '@/data/cases'
import FadeUp from '@/components/home/FadeUp'
import { useMessages } from '@/components/i18n/LocaleProvider'

const homeCaseOrder = [
  'chemical-ai-standardization',
  'cleaning-operations-os',
  'fire-equipment-digitalization',
] as const

const caseKeys = {
  'fire-equipment-digitalization': 'fire',
  'chemical-ai-standardization': 'chemical',
  'cleaning-operations-os': 'field',
} as const

export default function HomeCaseStudies() {
  const messages = useMessages()
  const t = messages.home.cases

  const homeCases = homeCaseOrder
    .map((slug) => cases.find((item) => item.slug === slug))
    .filter((item): item is (typeof cases)[number] => Boolean(item))

  return (
    <section id="cases" className="home-section scroll-mt-24 bg-off-white" aria-labelledby="cases-heading">
      <div className="home-container">
        <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <h2 id="cases-heading" className="home-h2 mb-5">
              {t.heading}
            </h2>
            <p className="home-body">{t.lead}</p>
          </div>
          <Link
            href="/cases"
            className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-sm font-medium text-brand-green hover:underline"
          >
            {messages.common.allWork}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>

        <ul className="divide-y divide-sequoia-black/10 border-y border-sequoia-black/10">
          {homeCases.map((item, i) => {
            const key = caseKeys[item.slug as keyof typeof caseKeys]
            const localized = t.items[key]

            return (
              <li key={item.slug}>
                <FadeUp delay={0.04 * i}>
                  <article className="grid gap-4 py-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-10 md:py-10">
                    <div>
                      <p className="home-label mb-3 text-brand-green">
                        {localized?.industry ?? item.enIndustry}
                      </p>
                      <h3 className="home-h3 mb-3">{localized?.theme ?? item.theme}</h3>
                      <p className="home-body max-w-2xl text-pretty">
                        {localized?.challenge ?? item.challenge}
                      </p>
                    </div>
                    <Link
                      href={`/cases/${item.slug}`}
                      className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-sm font-medium text-brand-green hover:underline"
                    >
                      {messages.common.view}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </Link>
                  </article>
                </FadeUp>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
