'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { axProcess } from '@/data/home'
import FadeUp from '@/components/home/FadeUp'

export default function AxProcess() {
  const [active, setActive] = useState(0)
  const [openMobile, setOpenMobile] = useState(0)
  const stageRefs = useRef<(HTMLElement | null)[]>([])
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return
    const observers: IntersectionObserver[] = []
    stageRefs.current.forEach((el, index) => {
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(index)
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      )
      observer.observe(el)
      observers.push(observer)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [prefersReducedMotion])

  return (
    <section id="ax-process" className="home-section scroll-mt-24 bg-light-blue" aria-labelledby="ax-heading">
      <div className="home-container">
        <FadeUp className="mb-12 max-w-3xl md:mb-16">
          <h2 id="ax-heading" className="home-h2 mb-5">
            {axProcess.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="home-body max-w-2xl">{axProcess.lead}</p>
        </FadeUp>

        {/* Desktop process */}
        <div className="hidden lg:block">
          <ol className="grid grid-cols-4 gap-4">
            {axProcess.stages.map((stage, index) => {
              const isActive = active === index
              return (
                <li
                  key={stage.id}
                  ref={(el) => {
                    stageRefs.current[index] = el
                  }}
                  className={`home-card border p-6 transition-[background-color,border-color,box-shadow] duration-500 ${
                    isActive
                      ? 'border-brand-green/25 bg-white shadow-md'
                      : 'border-transparent bg-white/50'
                  }`}
                >
                  <p className={`mb-3 text-xs font-medium tracking-[0.12em] ${isActive ? 'text-brand-green' : 'text-secondary'}`}>
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mb-5 text-xl font-medium text-sequoia-black">{stage.title}</h3>
                  <ul className="space-y-2.5">
                    {stage.items.map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-relaxed text-sequoia-black/75">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-green/60" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ol>
        </div>

        {/* Mobile accordion */}
        <div className="space-y-3 lg:hidden">
          {axProcess.stages.map((stage, index) => {
            const isOpen = openMobile === index
            return (
              <div key={stage.id} className="home-card overflow-hidden border border-sequoia-black/6 bg-white">
                <button
                  type="button"
                  className="flex min-h-14 w-full items-center justify-between px-5 py-4 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpenMobile(isOpen ? -1 : index)}
                >
                  <span>
                    <span className="mb-1 block text-[11px] font-medium tracking-[0.1em] text-brand-green">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-base font-medium text-sequoia-black">{stage.title}</span>
                  </span>
                  <span className="text-secondary" aria-hidden>
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <ul className="space-y-2 border-t border-sequoia-black/6 px-5 py-4">
                    {stage.items.map((item) => (
                      <li key={item} className="text-sm leading-relaxed text-sequoia-black/75">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
