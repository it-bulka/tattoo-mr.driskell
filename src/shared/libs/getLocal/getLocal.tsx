import i18n from 'i18next'
import { locales } from '../../config/i18n/types.ts'

type Locale = typeof locales[keyof typeof locales]

export const getLocal = (): Locale => {
  const currentLang = i18n.language as keyof typeof locales
  const locale = locales[currentLang] || locales.uk

  return locale
}