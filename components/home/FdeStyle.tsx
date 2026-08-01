import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { fdeStyle } from '@/data/home'
import FadeUp from '@/components/home/FadeUp'

export default function FdeStyle() {
  return (
    <section id="fde" className="home-section scroll-mt-24 bg-off-white" aria-labelledby="fde-heading">
      <div className="home-container">
        <FadeUp>
          <div className="relative overflow-hidden rounded-2xl border border-sequoia-black/8 bg-white px-6 py-10 md:px-12 md:py-14">
            {/* 3領域を横断する細いライン */}
            <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-brand-green/35 to-transparent md:inset-x-12" aria-hidden />
            <div className="pointer-events-none absolute inset-y-8 left-0 hidden w-px bg-gradient-to-b from-transparent via-brand-green/20 to-transparent md:block" aria-hidden />

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(240px,0.8fr)] lg:items-end">
              <div className="max-w-2xl">
                <p className="home-label mb-4 text-brand-green">{fdeStyle.label}</p>
                <h2 id="fde-heading" className="home-h2 mb-5">
                  {fdeStyle.heading}
                </h2>
                <p className="home-body mb-5">{fdeStyle.body}</p>
                <p className="mb-5 text-sm text-secondary">{fdeStyle.note}</p>
                <Link
                  href="/service/ai-solution#fde"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-green hover:underline"
                >
                  サービスページで詳しく見る
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </div>

              <div className="border-t border-sequoia-black/8 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                <p className="mb-4 text-xs font-medium tracking-[0.1em] text-secondary">横断する3領域</p>
                <ol className="space-y-3">
                  {fdeStyle.spans.map((label, index) => (
                    <li key={label} className="flex items-start gap-3 text-sm text-sequoia-black/80">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand-green/25 text-[11px] text-brand-green">
                        {index + 1}
                      </span>
                      <span className="leading-relaxed">{label}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-6 flex items-center gap-2" aria-hidden>
                  <span className="h-px flex-1 bg-brand-green/25" />
                  <span className="text-[11px] tracking-wide text-brand-green/80">現場伴走</span>
                  <span className="h-px flex-1 bg-brand-green/25" />
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
