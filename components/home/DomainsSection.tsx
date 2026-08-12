import Image from 'next/image'
import { implementationDomains } from '@/data/offerings'
import { domainsSection } from '@/data/home'

const domainImages: Record<(typeof implementationDomains)[number]['id'], { src: string; alt: string }> = {
  documents: {
    src: '/images/brand/training-split.png',
    alt: '文書・確認業務のイメージ',
  },
  knowledge: {
    src: '/images/brand/training-hero.png',
    alt: 'ナレッジ共有・打合せのイメージ',
  },
  field: {
    src: '/images/brand/consulting-split.png',
    alt: '現場業務のイメージ',
  },
}

export default function DomainsSection() {
  return (
    <section id="domains" className="home-section scroll-mt-24 bg-white" aria-labelledby="domains-heading">
      <div className="home-container">
        <div className="mb-10 max-w-3xl md:mb-14">
          <h2 id="domains-heading" className="home-h2 mb-5">
            {domainsSection.heading}
          </h2>
          <p className="home-body max-w-2xl">{domainsSection.lead}</p>
        </div>

        <ul className="space-y-5 md:space-y-6">
          {implementationDomains.map((domain) => {
            const image = domainImages[domain.id]
            return (
              <li
                key={domain.id}
                className="grid overflow-hidden rounded-2xl border border-sequoia-black/8 md:grid-cols-[minmax(220px,0.42fr)_minmax(0,1fr)]"
              >
                <div className="relative min-h-[180px] md:min-h-[220px]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
                <div className="flex flex-col justify-center bg-off-white px-6 py-7 md:px-8 md:py-8">
                  <h3 className="home-h3 mb-4">{domain.title}</h3>
                  <ul className="flex flex-wrap gap-x-5 gap-y-2">
                    {domain.items.map((item) => (
                      <li key={item} className="text-sm text-sequoia-black/75">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
