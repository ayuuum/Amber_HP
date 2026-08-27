import { howWeWorkPrinciples } from '@/data/offerings'
import { howWeWorkSection } from '@/data/home'

export default function HowWeWorkSection() {
  return (
    <section id="how-we-work" className="home-section scroll-mt-24 bg-off-white" aria-labelledby="how-we-work-heading">
      <div className="home-container">
        <div className="mb-10 max-w-3xl md:mb-14">
          <h2 id="how-we-work-heading" className="home-h2 mb-5">
            {howWeWorkSection.heading}
          </h2>
          <p className="home-body max-w-2xl">{howWeWorkSection.lead}</p>
        </div>

        <ul className="grid gap-6 md:grid-cols-2">
          {howWeWorkPrinciples.map((item) => (
            <li key={item.enTitle} className="border-t border-sequoia-black/10 pt-5">
              <h3 className="mb-2 text-lg font-medium text-sequoia-black md:text-xl">{item.enTitle}</h3>
              <p className="text-sm leading-relaxed text-secondary md:text-base">{item.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
