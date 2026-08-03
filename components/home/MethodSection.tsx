import { supportMethod } from '@/data/offerings'
import FadeUp from '@/components/home/FadeUp'

export default function MethodSection() {
  return (
    <section id="method" className="home-section scroll-mt-24 bg-off-white" aria-labelledby="method-heading">
      {/* 旧URL互換 */}
      <span id="fde" className="sr-only" />
      <div className="home-container">
        <FadeUp>
          <div className="relative overflow-hidden rounded-2xl border border-sequoia-black/8 bg-white px-6 py-10 md:px-12 md:py-14">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(240px,0.8fr)] lg:items-start">
              <div className="max-w-2xl">
                <h2 id="method-heading" className="home-h2 mb-5">
                  {supportMethod.heading}
                </h2>
                <p className="home-body mb-4">{supportMethod.body}</p>
                <p className="text-sm text-secondary">{supportMethod.note}</p>
              </div>

              <div className="border-t border-sequoia-black/8 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                <p className="mb-4 text-xs font-medium tracking-[0.1em] text-secondary">特徴</p>
                <ul className="space-y-3">
                  {supportMethod.features.map((label) => (
                    <li key={label} className="flex items-start gap-3 text-sm text-sequoia-black/80">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green/70" aria-hidden />
                      <span className="leading-relaxed">{label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
