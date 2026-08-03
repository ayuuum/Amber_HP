import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { offerings } from '@/data/offerings'
import { servicesSection } from '@/data/home'
import FadeUp from '@/components/home/FadeUp'
import { cn } from '@/lib/utils'

const toneClass = {
  green: 'bento-tone-green',
  blue: 'bento-tone-blue',
  amber: 'bento-tone-amber',
} as const

export default function ServicesOverview() {
  return (
    <section id="services" className="home-section scroll-mt-24 bg-white" aria-labelledby="services-heading">
      <div className="home-container">
        <FadeUp className="mb-10 max-w-3xl md:mb-14">
          <h2 id="services-heading" className="home-h2 mb-5">
            {servicesSection.heading}
          </h2>
          <p className="home-body max-w-2xl">{servicesSection.lead}</p>
        </FadeUp>

        {/* 流れの視覚化（シンプル） */}
        <FadeUp className="mb-8 md:mb-10">
          <ol className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
            {offerings.map((item, index) => (
              <li key={item.id} className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-sequoia-black/10 bg-off-white px-3.5 py-2 text-sm text-sequoia-black">
                  <span className="text-xs font-medium tracking-wide text-brand-green">{item.number}</span>
                  <span className="font-medium">{item.shortTitle}</span>
                </span>
                {index < offerings.length - 1 ? (
                  <span className="hidden text-brand-green/50 sm:inline" aria-hidden>
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </FadeUp>

        <ul className="grid gap-5 md:grid-cols-3">
          {offerings.map((item, i) => (
            <FadeUp key={item.id} delay={0.05 * i} className="h-full">
              <li className="h-full">
                <Link
                  href={item.href}
                  className={cn(
                    'home-card group flex h-full flex-col p-6 transition-[box-shadow,transform] duration-brand hover:-translate-y-0.5 hover:shadow-md md:p-7',
                    toneClass[item.tone]
                  )}
                >
                  <span className="mb-4 text-xs font-medium tracking-[0.12em] text-brand-green">{item.number}</span>
                  <h3 className="home-h3 mb-3 break-keep text-balance">{item.title}</h3>
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
      </div>
    </section>
  )
}
