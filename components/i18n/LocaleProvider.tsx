'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { defaultLocale, isLocale, localeCookieName, type Locale } from '@/lib/i18n/config'
import { messagesByLocale, type Messages } from '@/lib/i18n/messages'

type LocaleContextValue = {
  locale: Locale
  messages: Messages
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

function readStoredLocale(): Locale {
  if (typeof window === 'undefined') return defaultLocale
  try {
    const fromStorage = window.localStorage.getItem(localeCookieName)
    if (isLocale(fromStorage)) return fromStorage
    const fromCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${localeCookieName}=`))
      ?.split('=')[1]
    if (isLocale(fromCookie)) return fromCookie
  } catch {
    /* ignore */
  }
  return defaultLocale
}

function persistLocale(locale: Locale) {
  try {
    window.localStorage.setItem(localeCookieName, locale)
    document.cookie = `${localeCookieName}=${locale}; path=/; max-age=31536000; SameSite=Lax`
    document.documentElement.lang = locale
  } catch {
    /* ignore */
  }
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)

  useEffect(() => {
    const next = readStoredLocale()
    setLocaleState(next)
    document.documentElement.lang = next
  }, [])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    persistLocale(next)
  }, [])

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'ja' ? 'en' : 'ja')
  }, [locale, setLocale])

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      messages: messagesByLocale[locale],
      setLocale,
      toggleLocale,
    }),
    [locale, setLocale, toggleLocale],
  )

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}

export function useMessages() {
  return useLocale().messages
}
