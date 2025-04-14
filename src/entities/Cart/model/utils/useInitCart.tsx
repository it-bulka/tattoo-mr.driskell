import { useEffect } from 'react';
import { fetchCart } from '@/entities/Cart';
import { useAppDispatch } from '@/app/providers/StoreProvider/config/store.ts';

export const useInitCart = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch?.(fetchCart())
  }, [dispatch])
}