import { buildContactHref } from '@/lib/contact'
import Image from 'next/image'
import { PrimaryButton } from '@/components/ui/PrimaryButton'

type ContactCTAProps = {
  headingLines?: readonly string[]
  body?: string
  ctaLabel?: string
  source?: string
  className?: string
  note?: string
}

export default function ContactCTA({
  headingLines = ['Technology for Essential Industries.'],
  body = '業務やシステムの課題からご相談ください。',
  ctaLabel = 'Talk to Amber',
  source = 'contact-cta',
  className = '',
  note,
}: ContactCTAProps) {
  return (
    <section className={`relative overflow-hidden ${className}`}>
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
          <div className="mb-10 md:mb-10">
            <h2 className="home-h2 mb-6 !text-white">
              {headingLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mx-auto max-w-xl text-base leading-[1.625] !text-white">{body}</p>
          </div>
          <PrimaryButton href={buildContactHref(source, 'ai-solution')} variant="on-dark" className="w-full sm:w-auto">
            {ctaLabel}
          </PrimaryButton>
          {note ? <p className="mt-5 text-sm text-white/75">{note}</p> : null}
        </div>
      </div>
    </section>
  )
}
