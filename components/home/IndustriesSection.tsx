import Image from 'next/image'
import { focusIndustries } from '@/data/offerings'
import { industriesSection } from '@/data/home'

const industryImages: Record<(typeof focusIndustries)[number]['id'], { src: string; alt: string }> = {
  manufacturing: {
    src: '/images/ai-solution/cases/industry-manufacturing.jpg',
    alt: '製造・素材・化学の現場イメージ',
  },
  'field-services': {
    src: '/images/brand/domain-field.jpg',
    alt: '設備・保守・点検の現場イメージ',
  },
  construction: {
    src: '/images/ai-solution/cases/industry-construction.jpg',
    alt: '建設・施工の現場イメージ',
  },
  infrastructure: {
    src: '/images/brand/domain-knowledge.jpg',
    alt: '物流・社会インフラのイメージ',
  },
}

export default function IndustriesSection() {
  return (
    <section id="industries" className="home-section scroll-mt-24 bg-off-white" aria-labelledby="industries-heading">
      <div className="home-container">
        <div className="mb-10 max-w-3xl md:mb-14">
          <h2 id="industries-heading" className="home-h2 mb-5">
            {industriesSection.heading}
          </h2>
          <p className="home-body max-w-2xl">{industriesSection.lead}</p>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2">
          {focusIndustries.map((industry) => {
            const image = industryImages[industry.id]
            return (
              <li key={industry.id} className="overflow-hidden rounded-2xl border border-sequoia-black/8 bg-white">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-dark-green/80 via-dark-green/25 to-transparent"
                    aria-hidden
                  />
                  <div className="absolute bottom-4 left-5 right-5 md:bottom-5 md:left-6">
                    <p className="mb-1 text-xs font-medium tracking-[0.08em] text-white/75">{industry.enTitle}</p>
                    <h3 className="text-xl font-medium text-white md:text-2xl">{industry.title}</h3>
                  </div>
                </div>
                <p className="px-5 py-4 text-sm leading-relaxed text-sequoia-black/75 md:px-6">{industry.description}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
