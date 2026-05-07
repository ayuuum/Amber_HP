'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import {
  GlassCard,
  GlassCardAction,
  GlassCardContent,
  GlassCardDescription,
  GlassCardFooter,
  GlassCardHeader,
  GlassCardTitle,
} from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export default function TopCtaBlock() {
  return (
    <section className="border-t border-sequoia-black/10 bg-color-bg-subtle px-6 py-20 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl bg-[url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2670&auto=format&fit=crop)] bg-cover bg-center p-4 sm:p-8">
          <GlassCard className="mx-auto w-full max-w-xl">
            <GlassCardHeader>
              <GlassCardTitle className="text-xl md:text-2xl">
                まずは30分、無料でご相談ください
              </GlassCardTitle>
              <GlassCardDescription className="text-white/85">
                現場課題の整理から、AI導入の優先順位まで一緒に整理します。
              </GlassCardDescription>
              <GlassCardAction>
                <Button variant="link" className="p-0 text-white hover:text-white/80" asChild>
                  <Link href="/company#contact">お問い合わせへ</Link>
                </Button>
              </GlassCardAction>
            </GlassCardHeader>
            <GlassCardContent>
              <form>
                <div className="flex flex-col gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="top-cta-email" className="text-white">
                      メールアドレス
                    </Label>
                    <Input
                      id="top-cta-email"
                      type="email"
                      placeholder="you@example.com"
                      className="border-white/35 bg-white/10 text-white placeholder:text-white/60"
                    />
                  </div>
                </div>
              </form>
            </GlassCardContent>
            <GlassCardFooter className="flex-col gap-2 sm:flex-row">
              <Button className="w-full bg-white text-sequoia-black hover:bg-white/90" asChild>
                <Link href="/company#contact">
                  30分無料相談を予約
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </GlassCardFooter>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}
