export type PaymentType = 'online' | 'cashOnDelivery' | 'bankTransfer'
export type DeliveryType = 'courier' | 'novaPoshta'

export interface OrderSchema {
  payment: PaymentType
  delivery: DeliveryType
}