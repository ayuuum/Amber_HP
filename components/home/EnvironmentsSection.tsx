import { environments } from '@/data/offerings'
import { environmentsSection } from '@/data/home'

export default function EnvironmentsSection() {
  return (
    <section
      id="environments"
      className="home-section scroll-mt-24 bg-off-white"
      aria-labelledby="environments-heading"
    >
      <div className="home-container">
        <div className="mb-10 max-w-3xl md:mb-14">
          <h2 id="environments-heading" className="home-h2 mb-5">
            {environmentsSection.heading}
          </h2>
          <p className="home-body max-w-2xl">{environmentsSection.lead}</p>
        </div>

        <ul className="divide-y divide-sequoia-black/10 border-y border-sequoia-black/10 bg-white">
          {environments.map((env) => (
            <li
              key={env.id}
              className="grid gap-4 px-5 py-7 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-10 md:px-8 md:py-9"
            >
              <h3 className="home-h3 break-keep text-balance">{env.title}</h3>
              <ul className="space-y-2">
                {env.items.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-sequoia-black/75 md:text-[0.95rem]">
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
