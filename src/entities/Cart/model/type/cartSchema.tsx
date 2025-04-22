import { EntityState } from '@reduxjs/toolkit'

export type PromoCodeType = {
  id: string
  code: string
  type: 'percentage' | 'fixed'
  value: number
}

export type PromoCodeErr = {
  code: string
  message: string
}

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
  promoCode?: PromoCodeType
}

export interface CartDataRes {
  items: CartItemType[]
  totalItems: number
  totalToPay: number
  extraServices?: number
  discount: number,
  promocode?: PromoCodeType
  promoCodeError?: PromoCodeErr
}

export type CartSchema = EntityState<CartItemType, string> & Omit<CartData, 'items'> & {
  isLoading: boolean
  error?: string
  isBackSynchronized?: boolean
}

export interface CartItem {
  id: string;
  quantity: number
}

export interface SyncCartBody {
  userId: string,
  orderItems: CartItem[]
}

export interface PromoActivationReq {
  userId: string
  promoCode: string
  items: CartItem[]
  extraServices?: CartItem[]
}