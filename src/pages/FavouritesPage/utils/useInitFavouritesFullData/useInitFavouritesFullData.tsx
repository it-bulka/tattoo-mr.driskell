import { useEffect } from 'react'
import { useAppDispatch } from '@/app/providers/StoreProvider/config/store.ts'
import { initFavouriteProducts } from '@/features/addFavourite'

export const useInitFavouritesFullData = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initFavouriteProducts())
  }, [dispatch])
}