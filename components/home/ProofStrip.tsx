import { proofItems } from '@/data/home'
import FadeUp from '@/components/home/FadeUp'

export default function ProofStrip() {
  return (
    <section className="home-section border-b border-sequoia-black/6 bg-white" aria-labelledby="proof-heading">
      <div className="home-container">
        <FadeUp>
          <h2 id="proof-heading" className="home-h2 mb-12 max-w-3xl md:mb-16">
            企業のAI活用を、現場から支援しています
          </h2>
        </FadeUp>
        <FadeUp delay={0.08}>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-8">
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
