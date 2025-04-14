import { WritableDraft } from 'immer'
import { CartSchema } from '@/entities/Cart'

export interface RecalculateTotalsProps {
  totalAmount: number
  totalPrice: number
  discount: number
  quantity: number
  price: number
  originalPrice: number
}

export interface ReturnTotals {
  newTotalAmount: number
  newTotalPrice: number
  newDiscount: number
}

export const upgradeToZero = (num: number) => {
  if(num < 0) return 0
  return num
}

export const increaseTotals = ({
                          totalAmount,
                          totalPrice,
                          discount,
                          quantity,
                          price,
                          originalPrice
                        }: RecalculateTotalsProps): ReturnTotals => {
  const newTotalAmount = totalAmount + quantity

  const newItemTotalPrice = quantity * price
  const newTotalPrice = totalPrice + newItemTotalPrice
  const newDiscount = discount + (originalPrice - price) * quantity

  return {
    newTotalAmount: upgradeToZero(newTotalAmount),
    newTotalPrice: upgradeToZero(newTotalPrice),
    newDiscount: upgradeToZero(newDiscount),
  }
}

export const decreaseTotals = ({
                          totalAmount,
                          totalPrice,
                          discount,
                          quantity,
                          price,
                          originalPrice
                        }: RecalculateTotalsProps): ReturnTotals => {
  const newTotalAmount = totalAmount - quantity

  const newItemTotalPrice = quantity * price
  const newTotalPrice = totalPrice - newItemTotalPrice
  const newDiscount = discount - (originalPrice - price) * quantity

  return {
    newTotalAmount: upgradeToZero(newTotalAmount),
    newTotalPrice: upgradeToZero(newTotalPrice),
    newDiscount: upgradeToZero(newDiscount),
  }
}

export const updateCartTotals = (state: WritableDraft<CartSchema>, newTotals: ReturnTotals) => {
  state.totalAmount = newTotals.newTotalAmount
  state.totalPrice = newTotals.newTotalPrice
  state.discount = newTotals.newDiscount
}
