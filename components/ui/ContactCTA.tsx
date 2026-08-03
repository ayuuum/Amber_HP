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
  headingLines = ['生成AIを、', '実際の業務で使える状態へ'],
  body = '研修から始めたい場合も、具体的な業務をAI化したい場合も、現在の状況に合わせて進め方をご提案します。',
  ctaLabel = '生成AI活用について相談する',
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
