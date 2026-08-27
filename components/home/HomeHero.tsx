import Image from 'next/image'
import Link from 'next/link'
import { buildContactHref } from '@/lib/contact'
import { heroCopy, heroMedia } from '@/data/home'

export default function HomeHero() {
  const contactHref = buildContactHref('hero')

  return (
    <section className="relative flex min-h-[828px] items-end bg-dark-green md:items-center">
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
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.25)_0%,rgba(0,0,0,0.35)_55%,rgba(0,0,0,0.45)_100%),linear-gradient(0deg,rgba(16,51,45,0.55)_0%,rgba(16,51,45,0.15)_45%,rgba(16,51,45,0.35)_100%)]"
          aria-hidden
        />
      </div>

      <div className="home-container relative z-10 w-full pb-16 pt-28 md:pb-24 md:pt-32">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium tracking-[0.08em] text-white/70 md:text-base">Amber</p>
          <h1 className="home-hero-title mb-5 md:mb-6">{heroCopy.heading}</h1>
          <p className="mb-4 max-w-2xl text-lg font-medium leading-relaxed text-white md:text-xl">
            {heroCopy.subheading}
          </p>
          <p className="mb-10 max-w-2xl text-base leading-[1.9] text-white/85">{heroCopy.body}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href={heroCopy.primaryHref} className="btn-pill-on-dark w-full sm:w-auto">
              {heroCopy.primaryCta}
            </Link>
            <Link href={contactHref} className="btn-pill-ghost-on-dark w-full sm:w-auto">
              {heroCopy.secondaryCta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
