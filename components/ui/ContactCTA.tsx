import { buildContactHref } from '@/lib/contact'
import SectionHeader from '@/components/ui/SectionHeader'
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
  headingLines = ['Build What’s Next.'],
  body = '業務やシステムの課題からご相談ください。',
  ctaLabel = 'Talk to Amber',
  source = 'contact-cta',
  className = '',
  note,
}: ContactCTAProps) {
  return (
    <section className={`home-section bg-white ${className}`}>
      <div className="home-container">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeader heading={headingLines} lead={body} align="center" className="mb-10 md:mb-10" />
          <PrimaryButton href={buildContactHref(source, 'ai-solution')} className="w-full sm:w-auto">
            {ctaLabel}
          </PrimaryButton>
          {note ? <p className="mt-5 text-sm text-secondary">{note}</p> : null}
        </div>
      </div>
    </section>
  )
}
