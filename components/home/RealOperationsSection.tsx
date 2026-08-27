import { realOperationFlow } from '@/data/offerings'
import { realOperationsSection } from '@/data/home'

export default function RealOperationsSection() {
  return (
    <section id="operations" className="home-section scroll-mt-24 bg-white" aria-labelledby="operations-heading">
      <div className="home-container">
        <div className="mb-10 max-w-3xl md:mb-14">
          <h2 id="operations-heading" className="home-h2 mb-5">
            {realOperationsSection.heading}
          </h2>
          <p className="home-body max-w-2xl">{realOperationsSection.lead}</p>
        </div>

        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {realOperationFlow.map((step) => (
            <li
              key={step.en}
              className="flex flex-col justify-center rounded-2xl border border-sequoia-black/8 bg-off-white px-5 py-6 text-center"
            >
              <p className="mb-1 text-sm font-medium tracking-[0.06em] text-brand-green">{step.en}</p>
              <p className="text-base font-medium text-sequoia-black">{step.ja}</p>
            </li>
          ))}
        </ol>

        <p className="home-body mt-10 max-w-2xl">{realOperationsSection.closing}</p>
      </div>
    </section>
  )
}
