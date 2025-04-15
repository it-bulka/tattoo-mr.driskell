import { IS_BACK_CART_SYNC_LOCALSTORAGE } from '@/shared/consts'

export const offlineSyncLocalStorage = () => {
  localStorage.setItem(IS_BACK_CART_SYNC_LOCALSTORAGE, JSON.stringify(true))
}
