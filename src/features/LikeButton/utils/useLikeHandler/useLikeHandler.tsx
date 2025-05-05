import { useAppDispatch } from '@/app/providers/StoreProvider/config/store.ts'
import { useLocation } from 'react-router'
import { useDebounce } from '@/shared/libs'
import { deleteItemAndRefreshFavourites, likedIdsActions } from '@/features/addFavourite'
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx'

export const useLikeHandler = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()

  const debounceLikeToggle = useDebounce(({
    machineId,
    isLiked
  }) => {
    if(isLiked) {
      dispatch(likedIdsActions.addIdToAddQueue(machineId))
    } else {
      if (location.pathname === RoutePaths.favorites) {
        dispatch(deleteItemAndRefreshFavourites(machineId))
      } else {
        dispatch(likedIdsActions.addIdToRemoveQueue(machineId))
      }
    }
  })

  return { debounceLikeToggle }
}