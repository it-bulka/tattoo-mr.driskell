export type DiscountType = 'product' | 'category' | 'cart' | 'bundle'

export interface DiscountTier {
  minItems: number
  value: number
  isPercentage: boolean
}

export interface DiscountInfo {
  value: number
  isPercentage: boolean
  type: DiscountType
}
