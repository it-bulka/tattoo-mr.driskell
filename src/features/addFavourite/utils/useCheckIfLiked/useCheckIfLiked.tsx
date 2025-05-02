import { useSelector } from 'react-redux'
import { getLikedIdsSelector } from '@/features/addFavourite'
import { useCallback } from 'react'

export const useCheckIfLiked = () => {
  const likedIds = useSelector(getLikedIdsSelector)

  const isItemLiked = useCallback((id: string) => {
    return likedIds[id]
  }, [likedIds])

  return isItemLiked
}