import cls from './AvatarBtn.module.scss'
import classNames from 'classnames'
import User from '@/shared/assets/general/user.svg'
import { useNavigate } from 'react-router';
import { useCallback, memo } from 'react';
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx';

interface AvatarBtnProps {
  className?: string
}
export const AvatarBtn = memo(({ className }: AvatarBtnProps) => {
  const navigate = useNavigate()

  const onClick =  useCallback(() => {
    navigate(RoutePaths.profile)
  }, [])
  return (
    <button className={classNames(cls.AvatarBtn, {}, [className])} onClick={onClick}>
      <User />
    </button>
  )
})

AvatarBtn.displayName = 'AvatarBtn'