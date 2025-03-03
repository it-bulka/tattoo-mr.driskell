import cls from './LikeButton.module.scss'
import classNames from 'classnames'
import LikeIcon from '@/shared/assets/general/heart.svg?react'
import LikeFullIcon from '@/shared/assets/general/heart-fill.svg?react'
import { useCallback, useState } from 'react'

interface LikeButtonProps {
  className?: string,
  isLiked?: boolean
}
export const LikeButton = ({ className, isLiked = false }: LikeButtonProps) => {
  const [liked, setIsLiked] = useState<boolean>(isLiked)

  const onClick = useCallback(() => {
    setIsLiked(prev => !prev)
  }, [setIsLiked])

  return (
    <button
      className={classNames(cls.likeButton, {}, [className])}
      onClick={onClick}
    >
      <LikeIcon className={classNames(cls.icon, { [cls.visible]: !liked })} />
      <LikeFullIcon className={classNames(cls.icon, { [cls.visible]: liked })} />
    </button>
  )
}