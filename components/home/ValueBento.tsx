import { valueBento } from '@/data/home'
import FadeUp from '@/components/home/FadeUp'

const toneClass = {
  green: 'bento-tone-green',
  blue: 'bento-tone-blue',
  amber: 'bento-tone-amber',
  gray: 'bento-tone-gray',
} as const

export default function ValueBento() {
  return (
    <section className="home-section bg-white" aria-labelledby="value-heading">
      <div className="home-container">
        <FadeUp className="mb-12 max-w-3xl md:mb-16">
          <h2 id="value-heading" className="home-h2 mb-5">
            {valueBento.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="home-body max-w-2xl">{valueBento.lead}</p>
        </FadeUp>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          <FadeUp className="md:col-span-2 lg:col-span-2 lg:row-span-2">
            <article className={`home-card flex h-full min-h-[280px] flex-col justify-end p-7 md:min-h-[360px] md:p-10 ${toneClass[valueBento.featured.tone]}`}>
              <h3 className="home-h3 mb-4 max-w-md">{valueBento.featured.title}</h3>
              <p className="max-w-md text-base leading-relaxed text-sequoia-black/75">{valueBento.featured.description}</p>
            </article>
          </FadeUp>

          {valueBento.cards.map((card, i) => (
            <FadeUp key={card.title} delay={0.06 * (i + 1)}>
              <article className={`home-card flex h-full min-h-[180px] flex-col justify-end p-6 md:p-7 ${toneClass[card.tone]}`}>
                <h3 className="mb-3 text-lg font-medium leading-snug text-sequoia-black md:text-xl">{card.title}</h3>
                <p className="text-sm leading-relaxed text-sequoia-black/70">{card.description}</p>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
