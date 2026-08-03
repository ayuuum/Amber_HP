import { proofItems } from '@/data/home'
import FadeUp from '@/components/home/FadeUp'

export default function ProofStrip() {
  return (
    <section className="home-section border-b border-sequoia-black/6 bg-white" aria-labelledby="proof-heading">
      <div className="home-container">
        <FadeUp>
          <h2 id="proof-heading" className="sr-only">
            実績・信頼情報
          </h2>
        </FadeUp>
        <FadeUp delay={0.08}>
          <ul className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3 md:gap-8">
            {proofItems.map((item) => (
              <li key={item.label} className="min-w-0">
                <p className="mb-2 text-xl font-medium tracking-tight text-brand-green md:text-2xl">{item.value}</p>
                <p className="text-sm leading-relaxed text-secondary">{item.label}</p>
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>
    </section>
  )
}
