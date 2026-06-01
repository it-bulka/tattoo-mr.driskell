export type PaymentType = 'online' | 'cashOnDelivery' | 'bankTransfer'
export type DeliveryType = 'courier' | 'novaPoshta'
export type NPDeliverySubType = 'warehouse' | 'postomat' | 'courier'
export type OrderStatus = 'pending' | 'shipped' | 'delivered' | 'paid' | 'expired' | 'cancelled'

export interface OrderSchema {
  payment: PaymentType
  delivery: DeliveryType
  services: string[]
  status?: OrderStatus
  id?: string
  loading: boolean
  error?: string
}

type OrderItem = {
  id: string
  quantity: number
}

interface Buyer {
  name: string
  phone: string
  email: string
}

export interface CourierShippingAddress {
  city?: string
  street?: string
  apartment?: string
  entrance?: string
  floor?: string
  doorphone?: string
}

export interface NPShippingAddress {
  npCityRef: string
  npCityName: string
  npDeliveryType: NPDeliverySubType
  npWarehouseRef?: string
  npWarehouseName?: string
}

export interface Order {
  userId: string
  items: OrderItem[]
  paymentMethod: PaymentType
  deliveryMethod: DeliveryType
  buyer: Buyer
  shippingAddress: CourierShippingAddress | NPShippingAddress
  selectedServices: string[]
  promoCode?: string
  comment?: string
}

export interface OrderRes {
  orderId: string
  status: OrderStatus
}

export interface OrderHistoryItemProps {
  date: Date
  orderNumber: string
  quantity: number
  totalCost: number
  status: OrderStatus
  fullName: string
  address: string
  phone: string
  email: string
}