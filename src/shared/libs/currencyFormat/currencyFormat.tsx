import i18n from 'i18next'
import { locales } from '../../config/i18n/types.ts'

export const currencyFormat = (
  amount: number,
  currency: string = 'UAH'
) => {
  const currentLang = i18n.language as keyof typeof locales
  const locale = locales[currentLang] || locales.uk
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay: "symbol"
  })

  return formatter.format(amount)
}