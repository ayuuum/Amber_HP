import { environments } from '@/data/offerings'
import { environmentsSection } from '@/data/home'
import FadeUp from '@/components/home/FadeUp'

export default function EnvironmentsSection() {
  return (
    <section
      id="environments"
      className="home-section scroll-mt-24 bg-off-white"
      aria-labelledby="environments-heading"
    >
      <div className="home-container">
        <FadeUp className="mb-10 max-w-3xl md:mb-14">
          <h2 id="environments-heading" className="home-h2 mb-5">
            {environmentsSection.heading}
          </h2>
          <p className="home-body max-w-2xl">{environmentsSection.lead}</p>
        </FadeUp>

        <ul className="grid gap-5 md:grid-cols-3">
          {environments.map((env, i) => (
            <FadeUp key={env.id} delay={0.05 * i} className="h-full">
              <li className="home-card flex h-full flex-col border border-sequoia-black/8 bg-white p-6 md:p-7">
                <h3 className="home-h3 mb-5 break-keep text-balance">{env.title}</h3>
                <ul className="space-y-2.5">
                  {env.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-relaxed text-sequoia-black/75">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-green/60" aria-hidden />
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
