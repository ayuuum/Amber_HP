'use client'

import { realOperationFlow } from '@/data/offerings'
import { useMessages } from '@/components/i18n/LocaleProvider'

const flowKeys = ['inspection', 'decision', 'repair', 'reporting', 'billing'] as const

export default function RealOperationsSection() {
  const t = useMessages().home.operations

  return (
    <section id="operations" className="home-section scroll-mt-24 bg-white" aria-labelledby="operations-heading">
      <div className="home-container">
        <div className="mb-10 max-w-3xl md:mb-14">
          <h2 id="operations-heading" className="home-h2 mb-5">
            {t.heading}
          </h2>
          <p className="home-body max-w-2xl">{t.lead}</p>
        </div>

        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {realOperationFlow.map((step, index) => (
            <li
              key={step.en}
              className="flex flex-col justify-center rounded-2xl border border-sequoia-black/8 bg-off-white px-5 py-6 text-center"
            >
              <p className="mb-1 text-sm font-medium tracking-[0.06em] text-brand-green">{step.en}</p>
              <p className="text-base font-medium text-sequoia-black">{t.flow[flowKeys[index]]}</p>
            </li>
          ))}
        </ol>

        <p className="home-body mt-10 max-w-2xl">{t.closing}</p>
      </div>
    </section>
  )
}
