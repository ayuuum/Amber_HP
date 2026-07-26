import { cn } from '@/lib/utils'

type SectionHeaderProps = {
  heading: string | readonly string[]
  lead?: string
  eyebrow?: string
  className?: string
  id?: string
  align?: 'left' | 'center'
}

export default function SectionHeader({
  heading,
  lead,
  eyebrow,
  className,
  id,
  align = 'left',
}: SectionHeaderProps) {
  const lines = typeof heading === 'string' ? [heading] : heading
  return (
    <div className={cn('mb-10 max-w-3xl md:mb-14', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow ? <p className="home-label mb-3 text-brand-green">{eyebrow}</p> : null}
      <h2 id={id} className="home-h2 mb-4">
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h2>
      {lead ? <p className={cn('home-body', align === 'center' && 'mx-auto')}>{lead}</p> : null}
    </div>
  )
}
