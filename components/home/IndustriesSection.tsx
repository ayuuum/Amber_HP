import Image from 'next/image'
import { focusIndustries } from '@/data/offerings'
import { industriesSection } from '@/data/home'

const industryImages: Record<(typeof focusIndustries)[number]['id'], { src: string; alt: string }> = {
  manufacturing: {
    src: '/images/ai-solution/cases/industry-manufacturing.jpg',
    alt: '製造・化学の現場イメージ',
  },
  construction: {
    src: '/images/ai-solution/cases/industry-construction.jpg',
    alt: '建設・設備・保守の現場イメージ',
  },
}

export default function IndustriesSection() {
  return (
    <section id="industries" className="home-section scroll-mt-24 bg-white" aria-labelledby="industries-heading">
      <div className="home-container">
        <div className="mb-10 max-w-3xl md:mb-14">
          <h2 id="industries-heading" className="home-h2 mb-5">
            {industriesSection.heading}
          </h2>
          <p className="home-body max-w-2xl">{industriesSection.lead}</p>
        </div>

        <ul className="grid gap-5 md:grid-cols-2">
          {focusIndustries.map((industry) => {
            const image = industryImages[industry.id]
            return (
              <li key={industry.id} className="overflow-hidden rounded-2xl border border-sequoia-black/8">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-dark-green/75 via-dark-green/20 to-transparent"
                    aria-hidden
                  />
                  <h3 className="absolute bottom-4 left-5 text-xl font-medium text-white md:bottom-5 md:left-6 md:text-2xl">
                    {industry.title}
                  </h3>
                </div>
                <ul className="flex flex-wrap gap-x-4 gap-y-2 bg-off-white px-5 py-5 md:px-6">
                  {industry.items.map((item) => (
                    <li key={item} className="text-sm text-sequoia-black/75">
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
