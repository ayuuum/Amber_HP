'use client'

import { whatWeDoSteps } from '@/data/offerings'
import { useMessages } from '@/components/i18n/LocaleProvider'

const stepKeys = ['understand', 'redesign', 'build', 'scale'] as const

export default function WhatWeDoSection() {
  const t = useMessages().home.whatWeDo

  return (
    <section id="what-we-do" className="home-section scroll-mt-24 bg-white" aria-labelledby="what-we-do-heading">
      <div className="home-container">
        <div className="mb-10 max-w-3xl md:mb-14">
          <h2 id="what-we-do-heading" className="home-h2 mb-5">
            {t.heading}
          </h2>
          <p className="home-body max-w-2xl">{t.lead}</p>
        </div>

        <ol className="grid gap-8 border-t border-sequoia-black/10 pt-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {whatWeDoSteps.map((step, index) => {
            const copy = t.steps[stepKeys[index]]
            return (
              <li key={step.number} className="min-w-0">
                <p className="mb-3 text-sm font-medium tracking-[0.14em] text-brand-green">{step.number}</p>
                <p className="mb-1 text-sm font-medium text-sequoia-black/55">{step.enTitle}</p>
                <h3 className="mb-3 text-lg font-medium text-sequoia-black">{copy.title}</h3>
                <p className="text-sm leading-relaxed text-secondary">{copy.body}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
