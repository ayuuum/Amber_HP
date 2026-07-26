'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

/** /company#contact への旧リンクを /contact へ誘導 */
export default function CompanyContactRedirect() {
  const router = useRouter()

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.location.hash === '#contact') {
      const params = window.location.search
      router.replace(`/contact${params}`)
    }
  }, [router])

  return null
}
