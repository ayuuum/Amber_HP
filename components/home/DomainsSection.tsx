import { implementationDomains } from '@/data/offerings'
import { domainsSection } from '@/data/home'
import FadeUp from '@/components/home/FadeUp'

export default function DomainsSection() {
  return (
    <section id="domains" className="home-section scroll-mt-24 bg-white" aria-labelledby="domains-heading">
      <div className="home-container">
        <FadeUp className="mb-10 max-w-3xl md:mb-14">
          <h2 id="domains-heading" className="home-h2 mb-5">
            {domainsSection.heading}
          </h2>
          <p className="home-body max-w-2xl">{domainsSection.lead}</p>
        </FadeUp>

        <ul className="grid gap-5 md:grid-cols-3">
          {implementationDomains.map((domain, i) => (
            <FadeUp key={domain.id} delay={0.05 * i} className="h-full">
              <li className="home-card flex h-full flex-col border border-sequoia-black/8 bg-off-white p-6 md:p-7">
                <h3 className="home-h3 mb-5">{domain.title}</h3>
                <ul className="flex flex-wrap gap-2">
                  {domain.items.map((item) => (
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
