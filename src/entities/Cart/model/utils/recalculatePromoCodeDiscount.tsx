import { PromoCodeType } from '../type/cartSchema.tsx'
export const recalculatePromoCodeDiscount = (
  totalAmount: number,
  promoCode: PromoCodeType
) => {
  if(promoCode.type === 'fixed') return promoCode.value
  if (promoCode.type === 'percentage') {
    const discount = totalAmount / 100 * promoCode.value
    return discount * discount
  }

  return 0
}