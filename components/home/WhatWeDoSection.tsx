import { whatWeDoSteps } from '@/data/offerings'
import { whatWeDoSection } from '@/data/home'

export default function WhatWeDoSection() {
  return (
    <section id="what-we-do" className="home-section scroll-mt-24 bg-white" aria-labelledby="what-we-do-heading">
      <div className="home-container">
        <div className="mb-10 max-w-3xl md:mb-14">
          <h2 id="what-we-do-heading" className="home-h2 mb-5">
            {whatWeDoSection.heading}
          </h2>
          <p className="home-body max-w-2xl">{whatWeDoSection.lead}</p>
        </div>

        <ol className="grid gap-8 border-t border-sequoia-black/10 pt-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {whatWeDoSteps.map((step) => (
            <li key={step.number} className="min-w-0">
              <p className="mb-3 text-sm font-medium tracking-[0.14em] text-brand-green">{step.number}</p>
              <p className="mb-1 text-sm font-medium text-sequoia-black/55">{step.enTitle}</p>
              <h3 className="mb-3 text-lg font-medium text-sequoia-black">{step.title}</h3>
              <p className="text-sm leading-relaxed text-secondary">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
