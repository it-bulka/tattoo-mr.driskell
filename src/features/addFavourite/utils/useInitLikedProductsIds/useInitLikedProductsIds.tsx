import { useEffect } from 'react'
import { getFavouriteIds } from '../../model/service/getFavouriteIds.tsx'
import { useAppDispatch } from '@/app/providers/StoreProvider/config/store.ts'

export const useInitLikedProductsIds = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getFavouriteIds())
  }, [dispatch])
}