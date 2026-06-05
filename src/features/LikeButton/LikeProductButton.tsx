import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { isLikedSelector } from '@/features/addFavourite'
import { getIsAuth } from '@/features/auth'
import { LikeButton } from '@/shared/ui'
import { useAuthModals } from '@/shared/libs/authModalsContext'
import { useLikeHandler } from './utils/useLikeHandler/useLikeHandler.tsx'

interface LikeButtonProps {
  className?: string,
  machineId: string
}

export const LikeProductButton = ({
  className,
  machineId
}: LikeButtonProps) => {
  const isLiked = useSelector(isLikedSelector(machineId))
  const isAuth = useSelector(getIsAuth)
  const { debounceLikeToggle } = useLikeHandler()
  const { openAuthRequired } = useAuthModals()

  const onToggle = useCallback((isLiked: boolean) => {
    debounceLikeToggle({ machineId, isLiked })
  }, [machineId])

  return (
    <LikeButton
      isLiked={isLiked}
      onToggleLike={isAuth ? onToggle : undefined}
      onClickGuard={!isAuth ? openAuthRequired : undefined}
      className={className}
    />
  )
}