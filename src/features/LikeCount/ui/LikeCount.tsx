import cls from './LikeCount.module.scss'
import classNames from 'classnames'
import LikeIcon from "@/shared/assets/general/heart.svg?react"
import { useCallback, memo } from 'react'
import { useNavigate } from 'react-router'
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx'

interface LikeCountProps {
  className?: string
}
export const LikeCount = memo(({
  className
}: LikeCountProps) => {
  const navigate = useNavigate()

  const onClick =  useCallback(() => {
    navigate(RoutePaths.favorites)
  }, [])
  return (
    <button
      className={classNames(cls.likeCount, {}, [className])}
      type="button"
      onClick={onClick}
    >
      <LikeIcon />
    </button>
  )
})

LikeCount.displayName = 'LikeCount'