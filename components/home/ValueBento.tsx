import { valueBento } from '@/data/home'
import FadeUp from '@/components/home/FadeUp'
import {
  PriorityMatrixVisual,
  EnablementFlowVisual,
  AgentLinkVisual,
} from '@/components/home/ValueBentoVisuals'

const toneClass = {
  green: 'bento-tone-green',
  blue: 'bento-tone-blue',
  amber: 'bento-tone-amber',
} as const

function CardVisual({ visual, featured }: { visual: (typeof valueBento.cards)[number]['visual']; featured?: boolean }) {
  switch (visual) {
    case 'priority':
      return <PriorityMatrixVisual featured={featured} />
    case 'enablement':
      return <EnablementFlowVisual featured={featured} />
    case 'agent':
      return <AgentLinkVisual featured={featured} />
    default:
      return null
  }
}

export default function ValueBento() {
  const [featured, ...rest] = valueBento.cards

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

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 lg:gap-5">
          {/* カード1：入口（デスクトップでは大きく） */}
          <FadeUp className="md:col-span-2 lg:col-span-2 lg:row-span-2">
            <article
              className={`home-card flex h-full min-h-0 flex-col overflow-hidden p-5 sm:p-6 md:p-8 lg:p-9 ${toneClass[featured.tone]}`}
            >
              <div className="mb-5 grow basis-0 md:mb-6 lg:min-h-0 lg:flex-[1.15]">
                <CardVisual visual={featured.visual} featured />
              </div>
              <div className="shrink-0 lg:flex-[0.95] lg:flex lg:flex-col lg:justify-end">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <p className="home-label text-brand-green">{featured.label}</p>
                  {featured.entryLabel ? (
                    <span className="rounded-full border border-brand-green/25 bg-white/70 px-2.5 py-0.5 text-[11px] font-medium text-brand-green">
                      {featured.entryLabel}
                    </span>
                  ) : null}
                </div>
                <h3 className="home-h3 mb-3 break-keep text-balance">{featured.title}</h3>
                <p className="max-w-xl text-sm leading-relaxed text-sequoia-black/75 md:text-base">
                  {featured.description}
                </p>
              </div>
            </article>
          </FadeUp>

          {rest.map((card, i) => (
            <FadeUp key={card.id} delay={0.06 * (i + 1)} className="h-full min-h-0">
              <article
                className={`home-card flex h-full min-h-0 flex-col overflow-hidden p-5 sm:p-6 md:p-7 ${toneClass[card.tone]}`}
              >
                <div className="mb-4 grow basis-0 lg:flex-[1.1]">
                  <CardVisual visual={card.visual} />
                </div>
                <div className="shrink-0">
                  <p className="home-label mb-2 text-brand-green">{card.label}</p>
                  <h3 className="mb-3 break-keep text-balance text-lg font-medium leading-snug text-sequoia-black md:text-xl">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-sequoia-black/70">{card.description}</p>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
