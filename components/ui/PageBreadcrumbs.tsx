import Link from 'next/link'
import { cn } from '@/lib/utils'

export type Crumb = { label: string; href?: string }

export default function PageBreadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="パンくず" className={cn('mb-6 text-sm text-secondary', className)}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden>/</span> : null}
            {item.href ? (
              <Link href={item.href} className="hover:text-brand-green">
                {item.label}
              </Link>
            ) : (
              <span className="text-sequoia-black">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
