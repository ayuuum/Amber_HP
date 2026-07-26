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
  headingLines = ['自社のAI活用を、', 'どこから始めるべきか。'],
  body = '業務課題や現在の取り組みを伺い、最初に着手すべきテーマと進め方を一緒に整理します。',
  ctaLabel = 'AI活用の進め方を相談する',
  source = 'contact-cta',
  className = '',
  note,
}: ContactCTAProps) {
  return (
    <section className={`home-section bg-white ${className}`}>
      <div className="home-container">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeader heading={headingLines} lead={body} align="center" className="mb-10 md:mb-10" />
          <PrimaryButton href={buildContactHref(source, 'ai-solution')}>{ctaLabel}</PrimaryButton>
          {note ? <p className="mt-5 text-sm text-secondary">{note}</p> : null}
        </div>
      </div>
    </section>
  )
}
