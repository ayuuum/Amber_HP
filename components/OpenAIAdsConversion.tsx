'use client'

import { useEffect } from 'react'
import { captureError } from '@/lib/capture-error'

declare global {
  interface Window {
    oaiq?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export default function OpenAIAdsConversion() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'ai_solution_lead',
      conversion_location: 'ai_solution_thanks',
    })

    let attempt = 0
    let timeoutId: number | undefined

    const measure = () => {
      if (typeof window.oaiq === 'function') {
        window.oaiq('measure', 'lead_created', {
          type: 'customer_action',
        })
        return
      }

      attempt += 1
      if (attempt > 20) {
        captureError('OpenAI Ads conversion skipped: oaiq unavailable', {
          area: 'ai-solution-thanks',
        })
        return
      }

      timeoutId = window.setTimeout(measure, 250)
    }

    measure()

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId)
      }
    }
  }, [])

  return null
}
