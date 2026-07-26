import { trustPrinciples } from '@/data/home'
import FadeUp from '@/components/home/FadeUp'

export default function TrustPrinciples() {
  return (
    <section className="home-section bg-light-green/50" aria-labelledby="trust-heading">
      <div className="home-container">
        <FadeUp className="mb-12 max-w-3xl md:mb-16">
          <h2 id="trust-heading" className="home-h2">
            企業の現場で使える設計を
          </h2>
        </FadeUp>

        <ul className="grid gap-6 md:grid-cols-2">
          {trustPrinciples.map((item, i) => (
            <FadeUp key={item.title} delay={0.05 * i}>
              <li className="border-t border-sequoia-black/10 pt-5">
                <h3 className="mb-2 text-lg font-medium text-sequoia-black">{item.title}</h3>
                <p className="text-sm leading-relaxed text-secondary md:text-base">{item.description}</p>
              </li>
            </FadeUp>
          ))}
        </ul>
      </div>
    </section>
  )
}
