import { CART_LOCALSTORAGE } from '@/shared/consts'
import { CartItemType } from '../type/cartSchema.tsx'

export const guestCartStorage = {
  get(): CartItemType[] {
    try {
      const raw = localStorage.getItem(CART_LOCALSTORAGE)
      return raw ? (JSON.parse(raw) as CartItemType[]) : []
    } catch {
      return []
    }
  },

  set(items: CartItemType[]): void {
    if (items.length === 0) {
      localStorage.removeItem(CART_LOCALSTORAGE)
    } else {
      localStorage.setItem(CART_LOCALSTORAGE, JSON.stringify(items))
    }
  },

  clear(): void {
    localStorage.removeItem(CART_LOCALSTORAGE)
  },
}
