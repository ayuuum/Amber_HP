'use client'

import { useId, useState } from 'react'
import { cn } from '@/lib/utils'

export type AccordionItem = {
  question: string
  answer: string
}

type Props = {
  items: readonly AccordionItem[] | AccordionItem[]
  className?: string
  onItemOpen?: (index: number, question: string) => void
}

export default function FaqAccordion({ items, className, onItemOpen }: Props) {
  const baseId = useId()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item, index) => {
        const panelId = `${baseId}-panel-${index}`
        const buttonId = `${baseId}-button-${index}`
        const isOpen = openIndex === index
        return (
          <div key={item.question} className="home-card overflow-hidden border border-sequoia-black/8 bg-white">
            <h3>
              <button
                id={buttonId}
                type="button"
                className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-medium text-sequoia-black"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => {
                  if (isOpen) {
                    setOpenIndex(null)
                    return
                  }
                  setOpenIndex(index)
                  onItemOpen?.(index, item.question)
                }}
              >
                <span>{item.question}</span>
                <span className="shrink-0 text-secondary" aria-hidden>
                  {isOpen ? '−' : '+'}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className={cn(!isOpen && 'hidden')}
            >
              <p className="border-t border-sequoia-black/6 px-5 py-4 text-sm leading-relaxed text-secondary md:text-base">
                {item.answer}
              </p>
            </div>
            {/* JS無効時のフォールバック用に noscript 相当は details で併用 */}
            <noscript>
              <p className="border-t border-sequoia-black/6 px-5 py-4 text-sm text-secondary">{item.answer}</p>
            </noscript>
          </div>
        )
      })}
    </div>
  )
}
