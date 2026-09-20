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
  const hasBackgroundImage = isDark && image
  return (
    <section
      className={cn(
        'relative overflow-hidden pt-24 md:min-h-[420px] md:pt-32',
        hasBackgroundImage ? 'flex items-end md:min-h-[480px] md:items-center' : toneMap[tone]
      )}
    >
      {hasBackgroundImage ? (
        <div className="absolute inset-0 overflow-hidden">
          <Image src={image.src} alt={image.alt} fill className="object-cover object-center" sizes="100vw" priority />
          <div
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.28)_0%,rgba(0,0,0,0.38)_55%,rgba(0,0,0,0.5)_100%),linear-gradient(0deg,rgba(16,51,45,0.55)_0%,rgba(16,51,45,0.18)_45%,rgba(16,51,45,0.42)_100%)]"
            aria-hidden
          />
        </div>
      ) : null}
      <div
        className={cn(
          'home-container relative z-10 grid items-center gap-10 pb-14 md:gap-12 md:pb-20 lg:pb-24',
          hasBackgroundImage ? 'w-full pt-4 md:pt-0' : 'md:grid-cols-[minmax(0,1fr)_minmax(240px,0.9fr)]'
        )}
      >
        <div className="max-w-2xl">
          {eyebrow ? (
            <p
              className={cn(
                hasBackgroundImage ? 'mb-4 text-sm font-medium tracking-[0.08em] text-white md:text-base' : 'mb-4 text-xs font-medium tracking-[0.12em]',
                isDark && !hasBackgroundImage ? 'text-white/60' : !hasBackgroundImage ? 'text-secondary' : null
              )}
            >
              {eyebrow}
            </p>
          ) : null}
          <h1 className={cn(hasBackgroundImage ? 'home-hero-title mb-5 md:mb-6' : 'home-h2 mb-6', isDark ? '!text-white' : 'text-sequoia-black')}>
            {headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          {body ? (
            <p
              className={cn(
                hasBackgroundImage
                  ? 'mb-10 max-w-2xl text-base leading-[1.9] !text-white md:text-lg'
                  : 'mb-8 max-w-xl text-base leading-[1.8]',
                isDark && !hasBackgroundImage ? '!text-white/90' : !hasBackgroundImage ? 'text-secondary' : null
              )}
            >
              {body}
            </p>
          ) : null}
          {(primaryCta || secondaryCta) && (
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              {primaryCta ? (
                <Link
                  href={primaryCta.href}
                  className={cn(
                    'w-full sm:w-auto',
                    hasBackgroundImage ? 'btn-pill-on-dark' : isDark ? 'btn-pill bg-white text-dark-green hover:bg-white/90' : 'btn-pill-primary-solid'
                  )}
                >
                  {primaryCta.label}
                </Link>
              ) : null}
              {secondaryCta ? (
                <Link
                  href={secondaryCta.href}
                  className={cn(
                    'w-full sm:w-auto',
                    hasBackgroundImage ? 'btn-pill-ghost-on-dark' : isDark ? 'btn-pill-secondary' : 'btn-pill-outline'
                  )}
                >
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>
          )}
          {children}
        </div>
        {image && !hasBackgroundImage ? (
          <div className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl md:block">
            <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="(max-width:1024px) 40vw, 420px" priority />
          </div>
        ) : null}
      </div>
    </section>
  )
}
