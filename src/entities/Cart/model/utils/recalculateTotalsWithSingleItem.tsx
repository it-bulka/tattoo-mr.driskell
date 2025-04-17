type TotalsDelta = {
  totalAmount: number
  totalDiscount: number
  totalPrice: number
}

export const recalculateTotalsWithSingleItem = (
  delta: TotalsDelta,
  item: { price: number; originalPrice: number; quantity: number }
) => {
  const currentPrice = item.price || item.originalPrice

  delta.totalAmount += item.quantity
  delta.totalDiscount += (item.originalPrice - currentPrice)  * item.quantity
  delta.totalPrice += currentPrice * item.quantity
}
