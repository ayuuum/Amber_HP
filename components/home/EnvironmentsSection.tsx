import Image from 'next/image'
import { environments } from '@/data/offerings'
import { environmentsSection } from '@/data/home'

const environmentLogos: Partial<Record<(typeof environments)[number]['id'], { src: string; alt: string; className?: string }>> = {
  copilot: {
    src: '/images/ai-solution/logos/microsoft-copilot-badge.png',
    alt: 'Microsoft 365 Copilot',
    className: 'h-[92px] w-[92px] object-contain',
  },
  gemini: {
    src: '/images/ai-solution/logos/gemini-badge.png',
    alt: 'Google Workspace with Gemini',
    className: 'h-[55px] w-[196px] object-contain',
  },
  custom: {
    src: '/images/brand/amber-system-development.svg',
    alt: 'オーダーメイド',
    className: 'h-[72px] w-[72px] object-contain',
  },
}

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
          {environments.map((env) => {
            const logo = environmentLogos[env.id]
            return (
              <li
                key={env.id}
                className="grid gap-6 px-5 py-7 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-10 md:px-8 md:py-9"
              >
                <div className="flex flex-col items-center justify-center gap-4 text-center md:items-center">
                  <h3 className="home-h3 break-keep text-balance">{env.title}</h3>
                  {logo ? (
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={196}
                      height={92}
                      className={logo.className}
                    />
                  ) : null}
                </div>
                <ul className="space-y-2">
                  {env.items.map((item) => (
                    <li key={item} className="text-sm leading-relaxed text-sequoia-black/75 md:text-[0.95rem]">
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
