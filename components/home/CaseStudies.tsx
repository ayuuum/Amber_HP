'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cases, caseStatusLabel, isCompletedCase } from '@/data/cases'
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

        <ul className="grid gap-6 md:gap-8">
          {homeCases.map((item, i) => {
            const key = caseKeys[item.slug as keyof typeof caseKeys]
            const localized = t.items[key]

            return (
              <li key={item.slug}>
                <FadeUp delay={0.04 * i}>
                  <article className="overflow-hidden border border-sequoia-black/10 bg-white md:grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
                    <div className="relative aspect-[16/10] bg-off-white md:aspect-auto md:min-h-[220px]">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 36vw"
                      />
                    </div>
                    <div className="flex flex-col justify-center p-5 md:p-7">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <p className="home-label text-brand-green">
                          {localized?.industry ?? item.enIndustry}
                        </p>
                        <span className="rounded-full border border-sequoia-black/10 bg-off-white px-2.5 py-0.5 text-[11px] text-secondary">
                          {caseStatusLabel[item.status]}
                        </span>
                        {!isCompletedCase(item.status) ? (
                          <span className="rounded-full border border-brand-green/25 bg-light-green/60 px-2.5 py-0.5 text-[11px] text-brand-green">
                            In delivery
                          </span>
                        ) : null}
                        {item.period ? (
                          <span className="text-[11px] text-secondary">
                            {item.period === '進行中' ? 'In progress' : item.period}
                          </span>
                        ) : null}
                      </div>
                      <p className="mb-2 text-sm text-sequoia-black/60">{item.scaleLabel}</p>
                      <h3 className="home-h3 mb-3">{localized?.theme ?? item.theme}</h3>
                      <p className="home-body mb-4 max-w-2xl text-pretty">
                        {localized?.challenge ?? item.challenge}
                      </p>
                      {item.outcomes && item.outcomes.length > 0 ? (
                        <ul className="mb-5 space-y-1.5">
                          {item.outcomes.slice(0, 2).map((outcome) => (
                            <li key={outcome} className="flex gap-2 text-sm text-sequoia-black/70">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green/70" aria-hidden />
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      <Link
                        href={`/cases/${item.slug}`}
                        className="inline-flex min-h-11 w-fit items-center gap-1.5 text-sm font-medium text-brand-green hover:underline"
                      >
                        {messages.common.view}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </Link>
                    </div>
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
