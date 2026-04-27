'use client'

import Image from 'next/image'
import { placeholders } from '@/lib/placeholder-images'

export default function HomeImageStrip() {
  return (
    <section className="px-6 -mt-8 pb-8 md:-mt-12 md:pb-12" aria-label="イメージ写真">
      <div className="max-w-5xl mx-auto">
        <div className="relative aspect-[21/9] max-h-48 w-full rounded-sm overflow-hidden border border-sequoia-black/10 shadow-sm bg-sequoia-black/5">
          <Image
            src={placeholders.systemDevelopment}
            alt="AI・Webシステム開発と業務フロー設計を表すブランドビジュアル"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>
      </div>
    </section>
  )
}
