export type PromoDiscountType = 'percentage' | 'fixed'
export type PromoDiscountScope = 'all' | 'category' | 'period'

export interface PromoCodeItem {
  id: string
  code: string
  discountType: PromoDiscountType
  discountValue: number
  discountScope: PromoDiscountScope
  category?: string
  validFrom?: string
  expiresAt: string
  imgUrl: string
  title: string
  description: string[]
}
