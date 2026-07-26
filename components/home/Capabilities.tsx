import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { capabilities, capabilitiesSection } from '@/data/home'
import FadeUp from '@/components/home/FadeUp'
import { buildContactHref } from '@/lib/contact'
import { cn } from '@/lib/utils'

const toneClass = {
  green: 'bento-tone-green',
  blue: 'bento-tone-blue',
  amber: 'bento-tone-amber',
} as const

export default function Capabilities() {
  const entryHref = buildContactHref('roadmap', 'ai-solution')

  return (
    <section id="capabilities" className="home-section scroll-mt-24 bg-white" aria-labelledby="capabilities-heading">
      <div className="home-container">
        <FadeUp className="mb-12 max-w-3xl md:mb-16">
          <h2 id="capabilities-heading" className="home-h2 mb-5">
            {capabilitiesSection.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="home-body max-w-2xl">{capabilitiesSection.lead}</p>
        </FadeUp>

        <ul className="grid gap-5 md:grid-cols-3">
          {capabilities.map((item, i) => (
            <FadeUp key={item.id} delay={0.05 * i} className="h-full">
              <li className="h-full">
                <Link
                  href={item.href}
                  className={cn(
                    'home-card group flex h-full flex-col p-6 transition-[box-shadow,transform] duration-brand hover:-translate-y-0.5 hover:shadow-md md:p-7',
                    toneClass[item.tone]
                  )}
                >
                  <div className="mb-4 flex min-h-[1.5rem] items-center justify-between gap-3">
                    <span className="text-xs font-medium tracking-[0.12em] text-brand-green">{item.number}</span>
                    {item.entryLabel ? (
                      <span className="rounded-full border border-brand-green/25 bg-white/70 px-2.5 py-0.5 text-[11px] font-medium text-brand-green">
                        {item.entryLabel}
                      </span>
                    ) : (
                      <span className="invisible text-[11px]" aria-hidden>
                        —
                      </span>
                    )}
                  </div>
                  <h3 className="home-h3 mb-3">{item.title}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-sequoia-black/75 md:text-base">{item.description}</p>
                  <ul className="mt-auto space-y-2 border-t border-sequoia-black/8 pt-5">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-2 text-sm leading-relaxed text-sequoia-black/75">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-green/60" aria-hidden />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-green">
                    詳しく見る
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              </li>
            </FadeUp>
          ))}
        </ul>

        <FadeUp className="mt-12 md:mt-16">
          <div className="home-card border border-brand-green/15 bg-light-green/50 px-6 py-8 md:px-10 md:py-10">
            <div className="mx-auto max-w-2xl text-center">
              <h3 className="home-h3 mb-4">{capabilitiesSection.entryHeading}</h3>
              <p className="mb-8 text-sm leading-relaxed text-secondary md:text-base">{capabilitiesSection.entryBody}</p>
              <Link href={entryHref} className="btn-pill-primary-solid inline-flex">
                {capabilitiesSection.entryCta}
              </Link>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
