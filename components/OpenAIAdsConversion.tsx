'use client'

import { useEffect } from 'react'
import { captureError } from '@/lib/capture-error'

declare global {
  interface Window {
    oaiq?: (...args: unknown[]) => void
    dataLayer?: unknown[]
    __aiSolutionLeadTracked?: boolean
    __openAiAdsLeadTracked?: boolean
  }
}

export default function OpenAIAdsConversion() {
  useEffect(() => {
    const markConversion = (name: string, content: string) => {
      if (document.querySelector(`meta[name="${name}"]`)) return
      const meta = document.createElement('meta')
      meta.name = name
      meta.content = content
      document.head.appendChild(meta)
    }

    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'ai_solution_lead',
      conversion_location: 'ai_solution_thanks',
    })
    window.__aiSolutionLeadTracked = true
    markConversion('ai-solution-lead-conversion', 'dataLayer')

    let attempt = 0
    let timeoutId: number | undefined

    const measure = () => {
      if (typeof window.oaiq === 'function') {
        window.oaiq('measure', 'registration_completed', {
          type: 'customer_action',
          amount: 0,
          currency: 'USD',
        })
        window.__openAiAdsLeadTracked = true
        markConversion('openai-ads-conversion', 'registration_completed')
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
