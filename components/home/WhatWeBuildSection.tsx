'use client'

import { whatWeBuildItems } from '@/data/offerings'
import { useMessages } from '@/components/i18n/LocaleProvider'

const itemKeys = ['agents', 'apps', 'knowledge', 'workflow', 'data'] as const

export default function WhatWeBuildSection() {
  const t = useMessages().home.whatWeBuild

  return (
    <section id="what-we-build" className="home-section scroll-mt-24 bg-[#F3F4F6]" aria-labelledby="what-we-build-heading">
      <div className="home-container">
        <div className="mb-10 max-w-3xl md:mb-14">
          <h2 id="what-we-build-heading" className="home-h2 mb-5">
            {t.heading}
          </h2>
          <p className="home-body max-w-2xl">{t.lead}</p>
        </div>

        <ul className="divide-y divide-sequoia-black/10 border-y border-sequoia-black/10 bg-white">
          {whatWeBuildItems.map((item, index) => (
            <li
              key={item.enTitle}
              className="grid gap-2 px-5 py-6 md:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] md:items-baseline md:gap-10 md:px-8 md:py-7"
            >
              <h3 className="text-base font-medium text-sequoia-black md:text-lg">{item.enTitle}</h3>
              <p className="text-sm leading-relaxed text-secondary md:text-base">{t.items[itemKeys[index]]}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
