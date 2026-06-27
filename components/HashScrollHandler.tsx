'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

function scrollToHash(hash: string) {
  const target = document.querySelector(hash)
  if (!target) return
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function HashScrollHandler() {
  const pathname = usePathname()

  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return

    const id = window.requestAnimationFrame(() => {
      scrollToHash(hash)
    })

    return () => window.cancelAnimationFrame(id)
  }, [pathname])

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash
      if (hash) scrollToHash(hash)
    }

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return null
}
