import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { fdeStyleLink, serviceDomains, serviceOverview } from '@/data/navigation'

type Props = {
  onNavigate?: () => void
  variant?: 'mega' | 'mobile'
}

export default function ServiceNavPanel({ onNavigate, variant = 'mega' }: Props) {
  const isMega = variant === 'mega'

  return (
    <div className={isMega ? 'space-y-2' : 'space-y-3'}>
      <Link
        href={serviceOverview.href}
        onClick={onNavigate}
        className={
          isMega
            ? 'block rounded-xl border border-sequoia-black/8 bg-off-white px-4 py-3 transition-colors hover:border-brand-green/25 hover:bg-light-green/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/30'
            : 'block rounded-xl border border-sequoia-black/8 bg-off-white px-3 py-3'
        }
      >
        <span className="block text-sm font-medium text-sequoia-black">{serviceOverview.title}</span>
        <span className="mt-1 block text-xs leading-relaxed text-secondary">{serviceOverview.description}</span>
      </Link>

      <ul className={isMega ? 'grid gap-1 sm:grid-cols-2' : 'space-y-1'}>
        {serviceDomains.map((item) => (
          <li key={item.title}>
            <Link
              href={item.href}
              onClick={onNavigate}
              role={isMega ? 'menuitem' : undefined}
              className={
                isMega
                  ? 'block rounded-xl px-4 py-3 transition-colors hover:bg-light-green/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/30'
                  : 'block rounded-xl px-3 py-3 hover:bg-light-green/60'
              }
            >
              <span className="block text-sm font-medium text-sequoia-black">{item.title}</span>
              <span className="mt-0.5 block text-xs leading-relaxed text-secondary">{item.description}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className={isMega ? 'border-t border-sequoia-black/8 pt-2' : 'border-t border-sequoia-black/8 pt-3'}>
        <p className={`mb-2 ${isMega ? 'px-4' : 'px-3'} text-[11px] font-medium tracking-[0.08em] text-secondary`}>
          支援スタイル
        </p>
        <Link
          href={fdeStyleLink.href}
          onClick={onNavigate}
          role={isMega ? 'menuitem' : undefined}
          className={
            isMega
              ? 'group flex items-start justify-between gap-3 rounded-xl border border-dashed border-brand-green/25 bg-white px-4 py-3 transition-colors hover:border-brand-green/40 hover:bg-light-green/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/30'
              : 'flex items-start justify-between gap-3 rounded-xl border border-dashed border-brand-green/25 px-3 py-3'
          }
        >
          <span>
            <span className="block text-sm font-medium text-sequoia-black">{fdeStyleLink.title}</span>
            <span className="mt-0.5 block text-xs leading-relaxed text-secondary">{fdeStyleLink.description}</span>
          </span>
          {isMega ? (
            <ArrowRight
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-green/50 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-green"
              aria-hidden
            />
          ) : null}
        </Link>
      </div>
    </div>
  )
}
