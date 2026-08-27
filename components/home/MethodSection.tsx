import Image from 'next/image'
import { supportMethod } from '@/data/offerings'

const processSteps = [
  { title: '現状理解', detail: '課題と業務の整理' },
  { title: 'テーマ決定', detail: '着手領域の選定' },
  { title: '研修・試作', detail: '小さく試して検証' },
  { title: '実装', detail: '業務への組み込み' },
  { title: '定着', detail: '利用と改善の継続' },
] as const

const methodHeadingLines = ['現場に入り、', '実装まで進める', '伴走型支援'] as const

export default function MethodSection() {
  return (
    <section id="method" className="home-section scroll-mt-24 bg-off-white" aria-labelledby="method-heading">
      <span id="fde" className="sr-only" />
      <div className="home-container">
        <div className="grid rounded-2xl border border-sequoia-black/8 bg-white lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.9fr)]">
          <div className="min-w-0 px-6 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14">
            <div className="max-w-xl">
              <h2 id="method-heading" className="home-h2 mb-5">
                {methodHeadingLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
              <p className="home-body mb-8">{supportMethod.body}</p>

              <ul className="space-y-3 border-t border-sequoia-black/8 pt-6">
                {supportMethod.features.map((label) => (
                  <li key={label} className="flex items-start gap-3 text-sm text-sequoia-black/80">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green/70" aria-hidden />
                    <span className="leading-relaxed">{label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <ol className="mt-10 grid grid-cols-1 gap-4 border-t border-sequoia-black/8 pt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-3">
              {processSteps.map((step, index) => (
                <li key={step.title} className="min-w-0">
                  <p className="mb-1 text-[11px] font-medium tracking-[0.12em] text-brand-green">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <p className="text-sm font-medium text-sequoia-black">{step.title}</p>
                  <p className="mt-1 break-words text-xs leading-relaxed text-secondary">{step.detail}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative min-h-[280px] overflow-hidden rounded-b-2xl border-t border-sequoia-black/8 lg:min-h-full lg:rounded-b-none lg:rounded-r-2xl lg:border-l lg:border-t-0">
            <Image
              src="/images/brand/method-forest.jpg"
              alt="森を見上げる風景"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
