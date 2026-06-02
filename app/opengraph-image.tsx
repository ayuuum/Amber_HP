import { ImageResponse } from 'next/og'
import { siteMetadata } from '@/lib/site-metadata'

export const runtime = 'edge'

export const alt = siteMetadata.defaultTitle
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          backgroundColor: '#FFFFFF',
          padding: '64px',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* 背景アクセント */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '480px',
            height: '100%',
            background: 'linear-gradient(135deg, #0D5C3A 0%, #0A1C14 100%)',
            opacity: 0.06,
          }}
        />

        {/* ロゴ / ブランド名 */}
        <div
          style={{
            position: 'absolute',
            top: '56px',
            left: '64px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '4px',
              backgroundColor: '#0D5C3A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontSize: '20px',
              fontWeight: 900,
            }}
          >
            A
          </div>
          <span
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#1B1916',
              letterSpacing: '-0.01em',
            }}
          >
            Amber
          </span>
        </div>

        {/* グリーンライン */}
        <div
          style={{
            width: '56px',
            height: '4px',
            backgroundColor: '#0D5C3A',
            borderRadius: '2px',
            marginBottom: '24px',
          }}
        />

        {/* メインコピー */}
        <div
          style={{
            fontSize: '52px',
            fontWeight: 900,
            color: '#1B1916',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: '20px',
            maxWidth: '780px',
          }}
        >
          暮らしを支える産業に、
          <br />
          最新のテクノロジーを。
        </div>

        {/* サブコピー */}
        <div
          style={{
            fontSize: '22px',
            color: 'rgba(27, 25, 22, 0.65)',
            lineHeight: 1.6,
            maxWidth: '680px',
          }}
        >
          株式会社Amber — AIソリューション & AIプロダクト「Pine」
        </div>
      </div>
    ),
    { ...size },
  )
}
