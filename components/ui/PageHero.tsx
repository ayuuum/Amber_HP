import Link from 'next/link'
import Image from 'next/image'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type PageHeroProps = {
  headingLines: readonly string[]
  body?: string
  eyebrow?: string
  tone?: 'green' | 'blue' | 'amber' | 'dark' | 'offwhite'
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  image?: { src: string; alt: string }
  children?: ReactNode
}

const toneMap = {
  green: 'bg-light-green',
  blue: 'bg-light-blue',
  amber: 'bento-tone-amber',
  dark: 'bg-dark-green text-white',
  offwhite: 'bg-off-white',
} as const

export default function PageHero({
  headingLines,
  body,
  eyebrow,
  tone = 'offwhite',
  primaryCta,
  secondaryCta,
  image,
  children,
}: PageHeroProps) {
  const isDark = tone === 'dark'
  return (
    <section className={cn('relative overflow-hidden pt-24 md:min-h-[560px] md:pt-32', toneMap[tone])}>
      <div className="home-container grid items-center gap-10 pb-14 md:grid-cols-[minmax(0,1fr)_minmax(240px,0.9fr)] md:gap-12 md:pb-20 lg:pb-24">
        <div className="max-w-2xl">
          {eyebrow ? (
            <p className={cn('mb-4 text-xs font-medium tracking-[0.12em]', isDark ? 'text-white/60' : 'text-secondary')}>
              {eyebrow}
            </p>
          ) : null}
          <h1 className={cn('home-h2 mb-6', isDark ? '!text-white' : 'text-sequoia-black')}>
            {headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          {body ? (
            <p className={cn('mb-8 max-w-xl text-base leading-[1.8]', isDark ? '!text-white/90' : 'text-secondary')}>
              {body}
            </p>
          ) : null}
          {(primaryCta || secondaryCta) && (
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              {primaryCta ? (
                <Link
                  href={primaryCta.href}
                  className={cn('w-full sm:w-auto', isDark ? 'btn-pill bg-white text-dark-green hover:bg-white/90' : 'btn-pill-primary-solid')}
                >
                  {primaryCta.label}
                </Link>
              ) : null}
              {secondaryCta ? (
                <Link
                  href={secondaryCta.href}
                  className={cn(
                    'w-full sm:w-auto',
                    isDark ? 'btn-pill-secondary' : 'btn-pill-outline'
                  )}
                >
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>
          )}
          {children}
        </div>
        {image ? (
          <div className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl md:block">
            <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="(max-width:1024px) 40vw, 420px" priority />
          </div>
        ) : null}
      </div>
    </section>
  )
}
