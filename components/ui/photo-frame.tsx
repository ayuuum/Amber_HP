'use client'

import { ImageIcon } from 'lucide-react'

type PhotoFrameProps = {
  /** アスペクト比 */
  aspect?: '4/3' | '16/9' | '1/1' | '3/4' | '21/9' | '5/4'
  /** プレースホルダーラベル（差し替え後は不要） */
  label?: string
  /** 追加のクラス */
  className?: string
}

/**
 * 写真の差し替えを前提としたプレースホルダーフレーム。
 * 実画像が決まったら、本コンポーネントを <Image /> に置き換える。
 */
export default function PhotoFrame({
  aspect = '4/3',
  label = '写真',
  className = '',
}: PhotoFrameProps) {
  const aspectClass = {
    '4/3': 'aspect-[4/3]',
    '16/9': 'aspect-[16/9]',
    '1/1': 'aspect-square',
    '3/4': 'aspect-[3/4]',
    '21/9': 'aspect-[21/9]',
    '5/4': 'aspect-[5/4]',
  }[aspect]

  return (
    <div
      className={`relative w-full overflow-hidden rounded-sm border border-sequoia-black/10 bg-gradient-to-br from-sequoia-green/[0.04] via-sequoia-black/[0.02] to-sequoia-black/[0.06] ${aspectClass} ${className}`}
    >
      {/* 装飾：右上の薄い円 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-sequoia-green/[0.06] blur-2xl"
      />
      {/* ラベル */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-sequoia-black/30">
        <ImageIcon className="h-10 w-10" strokeWidth={1.25} aria-hidden="true" />
        <p className="text-[11px] font-medium tracking-[0.25em]">{label}</p>
      </div>
    </div>
  )
}
