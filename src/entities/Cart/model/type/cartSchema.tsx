import { EntityState } from '@reduxjs/toolkit'

export interface CartItemType {
  title: string
  price: number
  originalPrice: number
  quantity: number
  total: number
  image: string
  productId: string
}

export interface CartData {
  items?: CartItemType[]
  totalAmount?: number
  totalPrice?: number
  extraServices?: number
  discount?: number
}

export interface CartDataRes {
  items: CartItemType[]
  totalItems: number
  totalToPay: number
  extraServices?: number
  discount: number
}

export type CartSchema = EntityState<CartItemType, string> & Omit<CartData, 'items'> & {
  isLoading: boolean
  error?: string
  isBackSynchronized?: boolean
}

export interface SyncCartBody {
  userId: string,
  orderItems: { product: string; amount: number }[]
}