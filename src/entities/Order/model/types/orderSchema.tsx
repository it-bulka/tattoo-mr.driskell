import { CartFormData } from '@/features/CartForm/model/types/cartFormTypes.tsx'
export type PaymentType = 'online' | 'cashOnDelivery' | 'bankTransfer'
export type DeliveryType = 'courier' | 'novaPoshta'
export type OrderStatus = 'pending' | 'paid' | 'cancelled' | 'expired'

export interface OrderSchema {
  payment: PaymentType
  delivery: DeliveryType
  status?: OrderStatus
  id?: string
  loading: boolean
  error?: string
}

type OrderItem = {
  id: string
  quantity: number
}

type BuyerData = 'name' | 'phone' | 'email'
type Buyer = Pick<CartFormData, BuyerData>
type ShippingAddress = Omit<CartFormData, BuyerData>

export interface Order {
  userId: string
  items: OrderItem[]
  paymentMethod: PaymentType
  deliveryMethod: DeliveryType
  buyer: Buyer
  shippingAddress: ShippingAddress
}

export interface OrderRes {
  orderId: string
  status: OrderStatus
}