import cls from './LikeCount.module.scss'
import classNames from 'classnames'
import LikeIcon from "@/shared/assets/general/heart.svg?react"
import { useCallback, memo } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx'
import { getIsAuth } from '@/features/auth'
import { useAuthModals } from '@/shared/libs/authModalsContext'

interface LikeCountProps {
  className?: string
}
export const LikeCount = memo(({
  className
}: LikeCountProps) => {
  const navigate = useNavigate()
  const isAuth = useSelector(getIsAuth)
  const { openLogin } = useAuthModals()

  const onClick = useCallback(() => {
    if (isAuth) navigate(RoutePaths.favorites)
    else openLogin()
  }, [isAuth, navigate, openLogin])

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