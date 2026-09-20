'use client'

import { Bot, LayoutGrid, BookOpen, Workflow, Share2 } from 'lucide-react'
import { whatWeBuildItems } from '@/data/offerings'
import { useMessages } from '@/components/i18n/LocaleProvider'

const itemKeys = ['agents', 'apps', 'knowledge', 'workflow', 'data'] as const
const itemIcons = [Bot, LayoutGrid, BookOpen, Workflow, Share2] as const

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

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whatWeBuildItems.map((item, index) => {
            const Icon = itemIcons[index]
            return (
              <li
                key={item.enTitle}
                className="home-card flex flex-col gap-4 border border-sequoia-black/8 bg-white p-6 md:p-7"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-light-green text-brand-green">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="mb-2 text-base font-medium text-sequoia-black md:text-lg">{item.enTitle}</h3>
                  <p className="text-sm leading-relaxed text-secondary md:text-base">{t.items[itemKeys[index]]}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
