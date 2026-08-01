type GtagFn = (command: string, eventName: string, params?: Record<string, unknown>) => void

declare global {
  interface Window {
    gtag?: GtagFn
    dataLayer?: unknown[]
  }
}

/** GA / dataLayer が未設定でもエラーにならないイベント送信 */
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return

  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params)
      return
    }

    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: eventName, ...params })
  } catch {
    // 計測失敗はユーザー操作を妨げない
  }
}
