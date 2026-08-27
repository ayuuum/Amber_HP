import Image from 'next/image'
import { implementationDomains } from '@/data/offerings'

const domainImages: Record<(typeof implementationDomains)[number]['id'], { src: string; alt: string }> = {
  documents: {
    src: '/images/brand/domain-documents.jpg',
    alt: '文書・確認業務のイメージ',
  },
  knowledge: {
    src: '/images/brand/domain-knowledge.jpg',
    alt: 'ナレッジ共有・打合せのイメージ',
  },
  field: {
    src: '/images/brand/domain-field.jpg',
    alt: '現場業務のイメージ',
  },
}

/** 下層互換用。TOPでは WhatWeBuild を使用。 */
export default function DomainsSection() {
  return (
    <section id="domains" className="home-section scroll-mt-24 bg-white" aria-labelledby="domains-heading">
      <div className="home-container">
        <div className="mb-10 max-w-3xl md:mb-14">
          <h2 id="domains-heading" className="home-h2 mb-5">
            Technology built around real operations.
          </h2>
          <p className="home-body max-w-2xl">文書確認、ナレッジ、現場業務など、成果が見える領域から着手します。</p>
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
