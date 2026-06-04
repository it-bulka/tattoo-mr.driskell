import cls from './AvatarBtn.module.scss'
import classNames from 'classnames'
import User from '@/shared/assets/general/user.svg?react'
import { useNavigate } from 'react-router';
import { useCallback, memo } from 'react';
import { useSelector } from 'react-redux';
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx';
import { getIsAuth } from '@/features/auth';

interface AvatarBtnProps {
  className?: string
  onOpenLogin?: () => void
}

export const AvatarBtn = memo(({ className, onOpenLogin }: AvatarBtnProps) => {
  const navigate = useNavigate()
  const isAuth = useSelector(getIsAuth)

  const onClick = useCallback(() => {
    if (isAuth) {
      navigate(RoutePaths.profile)
    } else {
      onOpenLogin?.()
    }
  }, [isAuth, navigate, onOpenLogin])

  return (
    <button className={classNames(cls.AvatarBtn, {}, [className])} onClick={onClick}>
      <User />
    </button>
  )
})

AvatarBtn.displayName = 'AvatarBtn'