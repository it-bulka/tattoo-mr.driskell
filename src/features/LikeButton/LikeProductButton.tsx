import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import {
  isLikedSelector
} from '@/features/addFavourite'
import { LikeButton } from '@/shared/ui'
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
  const { debounceLikeToggle } = useLikeHandler()

  const onClick = useCallback((isLiked: boolean) => {
    debounceLikeToggle({ machineId, isLiked })
  }, [machineId])

  return (
    <LikeButton
      isLiked={isLiked}
      onToggleLike={onClick}
      className={className}
    />
  )
}