import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { capabilities, capabilitiesSection } from '@/data/home'
import FadeUp from '@/components/home/FadeUp'
import { cn } from '@/lib/utils'

const toneClass = {
  green: 'bento-tone-green',
  blue: 'bento-tone-blue',
  amber: 'bento-tone-amber',
} as const

export default function Capabilities() {
  return (
    <section id="capabilities" className="home-section scroll-mt-24 bg-white" aria-labelledby="capabilities-heading">
      <div className="home-container">
        <FadeUp className="mb-10 max-w-3xl md:mb-12">
          <h2 id="capabilities-heading" className="home-h2 mb-4">
            {capabilitiesSection.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="home-body max-w-2xl">{capabilitiesSection.lead}</p>
        </FadeUp>

        <ul className="grid gap-4 md:grid-cols-3">
          {capabilities.map((item, i) => (
            <FadeUp key={item.id} delay={0.05 * i} className="h-full">
              <li className="h-full">
                <Link
                  href={item.href}
                  className={cn(
                    'home-card group flex h-full flex-col p-5 transition-[box-shadow,transform] duration-brand hover:-translate-y-0.5 hover:shadow-md md:p-6',
                    toneClass[item.tone]
                  )}
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="text-xs font-medium tracking-[0.12em] text-brand-green">{item.number}</span>
                    {item.entryLabel ? (
                      <span className="rounded-full border border-brand-green/25 bg-white/70 px-2.5 py-0.5 text-[11px] font-medium text-brand-green">
                        {item.entryLabel}
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mb-2 text-lg font-medium leading-snug text-sequoia-black md:text-xl">{item.title}</h3>
                  <p className="mb-5 flex-1 text-sm leading-relaxed text-sequoia-black/75">{item.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-green">
                    詳しく見る
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              </li>
            </FadeUp>
          ))}
        </ul>

        <FadeUp className="mt-8 max-w-3xl">
          <p className="text-sm leading-relaxed text-secondary">
            現場伴走型支援（FDE）は、上記3領域を横断する支援スタイルです。
            <Link href="/#fde" className="ml-1 inline-flex items-center gap-1 font-medium text-brand-green hover:underline">
              詳しく見る
              <ArrowRight className="h-3 w-3" aria-hidden />
            </Link>
          </p>
        </FadeUp>
      </div>
    </section>
  )
}
