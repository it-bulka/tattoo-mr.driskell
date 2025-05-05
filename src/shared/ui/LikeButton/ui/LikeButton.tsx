import cls from './LikeButton.module.scss'
import classNames from 'classnames'
import LikeIcon from '@/shared/assets/general/heart.svg?react'
import LikeFullIcon from '@/shared/assets/general/heart-fill.svg?react'
import { useCallback, useState, MouseEvent } from 'react'
import { memo } from 'react'

interface LikeButtonProps {
  className?: string,
  isLiked?: boolean
  onToggleLike?: (isLiked: boolean) => void
}

export const LikeButton = memo(({
   className,
   isLiked = false,
   onToggleLike
}: LikeButtonProps) => {
  const [liked, setIsLiked] = useState<boolean>(isLiked)

  const onClick = useCallback((isLiked: boolean) => (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const status = !isLiked
    setIsLiked(status)

    onToggleLike?.(status)
  }, [setIsLiked, onToggleLike])

  return (
    <button
      className={classNames(cls.likeButton, {}, [className])}
      onClick={onClick(liked)}
    >
      <LikeIcon className={classNames(cls.icon, { [cls.visible]: !liked })} />
      <LikeFullIcon className={classNames(cls.icon, { [cls.visible]: liked })} />
    </button>
  )
})

LikeButton.displayName = 'LikeButton'