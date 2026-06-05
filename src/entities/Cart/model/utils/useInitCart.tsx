import { useEffect } from 'react'
import { fetchCart } from '../services/fetchCart.tsx'
import { cartActions } from '../slice/cartSlice.tsx'
import { useAppDispatch } from '@/app/providers/StoreProvider/config/store.ts'
import { useSelector } from 'react-redux'
import { getUserId } from '@/entities/User'
import { guestCartStorage } from './guestCartStorage.tsx'

export const useInitCart = () => {
  const dispatch = useAppDispatch()
  const userId = useSelector(getUserId)

  useEffect(() => {
    if (userId) {
      dispatch(fetchCart())
    } else {
      const savedItems = guestCartStorage.get()
      if (savedItems.length > 0) {
        dispatch(cartActions.setGuestCartFromStorage(savedItems))
      }
    }
  }, [dispatch, userId])
}
