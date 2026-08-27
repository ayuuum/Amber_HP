export const locales = ['ja', 'en'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'ja'
export const localeCookieName = 'amber_locale'

export function isLocale(value: string | null | undefined): value is Locale {
  return value === 'ja' || value === 'en'
}
