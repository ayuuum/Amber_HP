'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cases } from '@/data/cases'
import CaseStudyCard from '@/components/ui/CaseStudyCard'
import FadeUp from '@/components/home/FadeUp'
import { useMessages } from '@/components/i18n/LocaleProvider'

const caseKeys = {
  'fire-equipment-digitalization': 'fire',
  'chemical-ai-standardization': 'chemical',
  'cleaning-operations-os': 'field',
} as const

export default function HomeCaseStudies() {
  const messages = useMessages()
  const t = messages.home.cases

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
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((item, i) => {
            const localized = t.items[caseKeys[item.slug as keyof typeof caseKeys]]
            return (
              <li key={item.slug}>
                <FadeUp delay={0.04 * i}>
                  <CaseStudyCard
                    item={{
                      ...item,
                      theme: localized?.theme ?? item.theme,
                      challenge: localized?.challenge ?? item.challenge,
                    }}
                    variant="compact"
                    viewLabel={messages.common.view}
                  />
                </FadeUp>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
