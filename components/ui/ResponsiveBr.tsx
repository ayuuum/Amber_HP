'use client'

/**
 * レスポンシブな改行。
 * - show="mobile" → モバイル（md未満）でのみ改行
 * - show="desktop" → デスクトップ（md以上）でのみ改行
 */
export default function ResponsiveBr({ show = 'mobile' }: { show?: 'mobile' | 'desktop' }) {
  if (show === 'mobile') {
    return <br className="md:hidden" />
  }
  return <br className="hidden md:inline" />
}
