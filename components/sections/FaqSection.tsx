'use client'

import { faqCategories } from '@/lib/faq-data'

export default function FaqSection() {
  return (
    <div className="space-y-12">
      {faqCategories.map((category) => (
        <section key={category.id} aria-labelledby={`faq-${category.id}`}>
          <h2 id={`faq-${category.id}`} className="heading-h3 mb-6">
            {category.title}
          </h2>
          <div className="divide-y divide-sequoia-black/10 border-y border-sequoia-black/10">
            {category.items.map((item) => (
              <details key={item.question} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-base font-medium text-sequoia-black transition-colors hover:text-sequoia-green [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-sequoia-black/15 text-sm text-sequoia-black/50 transition-transform group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <p className="pb-5 text-body leading-relaxed text-sequoia-black/75">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
