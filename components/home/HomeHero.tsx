'use client'

import Image from 'next/image'
import Link from 'next/link'
import { heroCopy, heroMedia } from '@/data/home'
import HomeHeroInquiry from '@/components/home/HomeHeroInquiry'

export default function HomeHero() {
  return (
    <section className="relative flex min-h-[828px] items-start bg-dark-green md:items-center">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={heroMedia.image}
          alt={heroMedia.imageAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.2)_100%),linear-gradient(0deg,rgba(16,51,45,0.5)_0%,rgba(16,51,45,0)_50%,rgba(16,51,45,0.25)_100%)]"
          aria-hidden
        />
      </div>

      <div className="home-container relative z-10 w-full pb-10 pt-24 md:pb-16 md:pt-32">
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.9fr)] lg:items-center lg:gap-12 xl:gap-16">
          <div className="min-w-0 max-w-xl lg:pt-0">
            <h1 className="home-hero-title mb-3 md:mb-6">
              {heroCopy.headingLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p className="mb-6 max-w-md text-base font-normal leading-[1.9] text-white/90 md:mb-8 md:max-w-lg">
              {heroCopy.body}
            </p>

            <Link href={heroCopy.secondaryHref} className="btn-pill-ghost-on-dark w-full sm:w-auto">
              {heroCopy.secondaryCta}
            </Link>
          </div>

          <div className="flex w-full justify-center">
            <HomeHeroInquiry />
          </div>
        </div>
      </div>
    </section>
  )
}
