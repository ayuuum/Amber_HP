'use client'

/**
 * ルートレイアウトより外で落ちたエラー用。globals.css に依存しない最小 UI で「真っ白」を避ける。
 * @see https://nextjs.org/docs/app/building-your-application/routing/error-handling
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="ja">
      <body
        style={{
          margin: 0,
          padding: '2rem',
          fontFamily: 'system-ui, sans-serif',
          background: '#ffffff',
          color: '#1b1916',
          lineHeight: 1.6,
        }}
      >
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700 }}>表示できませんでした</h1>
        <p style={{ marginTop: '1rem', maxWidth: '32rem' }}>
          一時的な不具合の可能性があります。再試行するか、しばらく経ってからトップページにお戻りください。
        </p>
        {error.digest ? (
          <p style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: '#666' }}>
            参照: {error.digest}
          </p>
        ) : null}
        <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={reset}
            style={{
              padding: '0.6rem 1.2rem',
              fontWeight: 600,
              border: 'none',
              borderRadius: '4px',
              background: '#0d5c3a',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            再試行
          </button>
          <a
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.6rem 1.2rem',
              fontWeight: 600,
              borderRadius: '4px',
              border: '1px solid #ccc',
              color: '#1b1916',
              textDecoration: 'none',
            }}
          >
            トップへ
          </a>
        </div>
      </body>
    </html>
  )
}
