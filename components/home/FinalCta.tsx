'use client'

import Image from 'next/image'
import Link from 'next/link'
import { buildContactHref } from '@/lib/contact'
import { useMessages } from '@/components/i18n/LocaleProvider'

export default function FinalCta() {
  const t = useMessages().home.finalCta
  const href = buildContactHref('home-final-cta', 'ai-solution')

  return (
    <section className="relative overflow-hidden" aria-labelledby="final-cta-heading">
      <div className="absolute inset-0">
        <Image
          src="/images/brand/method-forest.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          aria-hidden
        />
        <div className="absolute inset-0 bg-dark-green/70" aria-hidden />
      </div>

      <div className="home-container relative z-10 py-16 md:py-20 lg:py-[7.5rem]">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="final-cta-heading" className="home-h2 mb-6 text-white">
            {t.heading}
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-base leading-[1.625] text-white/90">{t.body}</p>
          <Link href={href} className="btn-pill-primary-solid inline-flex min-h-12 w-full px-8 sm:w-auto">
            {t.cta}
          </Link>
        </div>
      </div>
    </section>
  )
}
