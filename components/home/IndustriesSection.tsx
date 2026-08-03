import { focusIndustries } from '@/data/offerings'
import { industriesSection } from '@/data/home'
import FadeUp from '@/components/home/FadeUp'

export default function IndustriesSection() {
  return (
    <section id="industries" className="home-section scroll-mt-24 bg-white" aria-labelledby="industries-heading">
      <div className="home-container">
        <FadeUp className="mb-10 max-w-3xl md:mb-14">
          <h2 id="industries-heading" className="home-h2 mb-5">
            {industriesSection.heading}
          </h2>
          <p className="home-body max-w-2xl">{industriesSection.lead}</p>
        </FadeUp>

        <ul className="grid gap-5 md:grid-cols-2">
          {focusIndustries.map((industry, i) => (
            <FadeUp key={industry.id} delay={0.05 * i} className="h-full">
              <li className="home-card flex h-full flex-col border border-sequoia-black/8 bg-off-white p-6 md:p-8">
                <h3 className="home-h3 mb-5">{industry.title}</h3>
                <ul className="flex flex-wrap gap-2">
                  {industry.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-sequoia-black/8 bg-white px-3 py-1.5 text-sm text-sequoia-black/80"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            </FadeUp>
          ))}
        </ul>
      </div>
    </section>
  )
}
