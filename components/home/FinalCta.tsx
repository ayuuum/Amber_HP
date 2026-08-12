import Link from 'next/link'
import { buildContactHref } from '@/lib/contact'
import { finalCta } from '@/data/home'

export default function FinalCta() {
  const href = buildContactHref('home-final-cta', 'ai-solution')

  return (
    <section className="home-section bg-white" aria-labelledby="final-cta-heading">
      <div className="home-container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="final-cta-heading" className="home-h2 mb-6">
            {finalCta.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="home-body mx-auto mb-10 max-w-xl">{finalCta.body}</p>
          <Link href={href} className="btn-pill-primary-solid inline-flex min-h-12 w-full px-8 sm:w-auto">
            {finalCta.cta}
          </Link>
        </div>
      </div>
    </section>
  )
}
