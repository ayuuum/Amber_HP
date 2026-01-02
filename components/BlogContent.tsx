'use client'

import Image from 'next/image'
import { useMemo } from 'react'

type BlogContentProps = {
  html: string
}

export default function BlogContent({ html }: BlogContentProps) {
  const elements = useMemo(() => {
    // 画像タグを抽出
    const imgRegex = /<img([^>]*?)src="([^"]*?)"([^>]*?)>/g
    const parts: Array<{ type: 'html' | 'image'; content: string; alt?: string; src?: string }> = []
    let lastIndex = 0
    let match

    while ((match = imgRegex.exec(html)) !== null) {
      // 画像の前のHTMLを追加
      if (match.index > lastIndex) {
        parts.push({
          type: 'html',
          content: html.substring(lastIndex, match.index),
        })
      }

      const src = match[2]
      const altMatch = match[0].match(/alt="([^"]*?)"/)
      const alt = altMatch ? altMatch[1] : ''

      parts.push({
        type: 'image',
        src,
        alt,
        content: match[0],
      })

      lastIndex = match.index + match[0].length
    }

    // 残りのHTMLを追加
    if (lastIndex < html.length) {
      parts.push({
        type: 'html',
        content: html.substring(lastIndex),
      })
    }

    // 画像がない場合は通常のHTMLとして返す
    if (parts.length === 1 && parts[0].type === 'html') {
      return null
    }

    return parts
  }, [html])

  // 画像がない場合は通常のHTMLとして表示
  if (!elements) {
    return (
      <div
        className="prose prose-lg max-w-none text-deep-forest-green leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html }}
        style={{
          '--tw-prose-headings': '#1F3326',
          '--tw-prose-links': '#1F3326',
          '--tw-prose-bold': '#1F3326',
        } as React.CSSProperties}
      />
    )
  }

  // 画像が含まれている場合は分割して表示
  return (
    <div
      style={{
        '--tw-prose-headings': '#1F3326',
        '--tw-prose-links': '#1F3326',
        '--tw-prose-bold': '#1F3326',
      } as React.CSSProperties}
    >
      {elements.map((part, index) => {
        if (part.type === 'html') {
          return (
            <div
              key={`html-${index}`}
              className="prose prose-lg max-w-none text-deep-forest-green leading-relaxed"
              dangerouslySetInnerHTML={{ __html: part.content }}
            />
          )
        } else {
          // ローカル画像（/blog-images/で始まる）の場合のみNext.js Imageを使用
          if (part.src?.startsWith('/blog-images/')) {
            return (
              <div key={`img-${index}`} className="my-8">
                <Image
                  src={part.src}
                  alt={part.alt || ''}
                  width={800}
                  height={600}
                  className="rounded-sm w-full h-auto"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            )
          } else {
            // 外部画像はそのままHTMLとして表示
            return (
              <div
                key={`img-${index}`}
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: part.content }}
              />
            )
          }
        }
      })}
    </div>
  )
}
