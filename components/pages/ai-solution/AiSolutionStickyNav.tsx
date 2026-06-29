'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { stickyNavItems } from './data'

export default function AiSolutionStickyNav() {
  const [activeId, setActiveId] = useState<string>(stickyNavItems[0].id)

  useEffect(() => {
    const ids = stickyNavItems.map((item) => item.id)
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5] },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label="ページ内ナビゲーション"
      className="sticky top-20 z-30 hidden border-b border-sequoia-black/10 bg-color-bg/90 backdrop-blur-md md:block"
    >
      <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-6 py-3">
        {stickyNavItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              'shrink-0 rounded-sm px-4 py-2 text-xs font-semibold tracking-wider transition-colors',
              activeId === item.id
                ? 'bg-sequoia-green/10 text-sequoia-green'
                : 'text-sequoia-black/55 hover:text-sequoia-black',
            )}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
