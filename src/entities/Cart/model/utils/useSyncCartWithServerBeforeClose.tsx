import { CartItemType, getCartItemsSelector, getCartSyncWithBackSelector } from '@/entities/Cart';
import { IS_BACK_CART_SYNC_LOCALSTORAGE } from '@/shared/consts';
import { useSelector } from 'react-redux';
import { getUserId } from '@/entities';
import { useCallback } from 'react';

const offlineSyncCartWithServer = (userId: string, cartItems: CartItemType[]) => {
  const payload = {
    userId,
    orderItems: cartItems.map(item => ({
      product: item.productId,
      amount: item.quantity,
    })),
  }

  if (navigator.onLine) {
    navigator.sendBeacon('/carts/sync', JSON.stringify(payload))
    localStorage.removeItem(IS_BACK_CART_SYNC_LOCALSTORAGE)
  }
}

export const restartSyncCartWithServer = (userId: string, cartItems: CartItemType[]) => {
  const cartJson = localStorage.getItem(IS_BACK_CART_SYNC_LOCALSTORAGE)
  if (cartJson) {
    offlineSyncCartWithServer(userId, cartItems)
  }
}

export const useSyncCartWithServerBeforeClose = () => {
  const cartItems = useSelector(getCartItemsSelector)
  const isCartSync = useSelector(getCartSyncWithBackSelector)
  const userId = useSelector(getUserId)

  const handleCartSync = useCallback(() => {
    if(isCartSync || !cartItems || !userId) return

    restartSyncCartWithServer(userId, cartItems)
  }, [cartItems, userId, isCartSync])


  return handleCartSync
}