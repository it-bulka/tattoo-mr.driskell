import cls from './LikeButton.module.scss'
import classNames from 'classnames'
import LikeIcon from '@/shared/assets/general/heart.svg?react'
import LikeFullIcon from '@/shared/assets/general/heart-fill.svg?react'
import { useCallback, useEffect, useState, MouseEvent } from 'react'
import { useAddLikeMutation, useDeleteLikeMutation } from './model/api/likesApi.tsx'
import { useDebounce } from '@/shared/libs'

interface LikeButtonProps {
  className?: string,
  isLiked?: boolean
  machineId: string
}

export const LikeButton = ({
  className,
  isLiked = false,
  machineId
}: LikeButtonProps) => {
  const [liked, setIsLiked] = useState<boolean>(isLiked)
  const [addLike, { isError: isAddErr }] = useAddLikeMutation()
  const [deleteLike, { isError: isDelErr }] = useDeleteLikeMutation()

  const debounceAddLike = useDebounce(({
    machineId, userId, isLiked
  }) => {
    if(isLiked) {
      addLike({ machineId, userId })
    } else {
      deleteLike({ machineId, userId })
    }
  })

  const onClick = useCallback((isLiked: boolean) => (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const status = !isLiked
    setIsLiked(status)
    // TODO: delete userId after adding auth
    debounceAddLike({ machineId, userId: import.meta.env.VITE_CURRENT_USER_ID, isLiked: status })
  }, [setIsLiked, machineId])

  useEffect(() => {
    if (isAddErr) setIsLiked(false)
    if (isDelErr) setIsLiked(true)

  }, [isAddErr, isDelErr, setIsLiked])

  return (
    <button
      className={classNames(cls.likeButton, {}, [className])}
      onClick={onClick(liked)}
    >
      <LikeIcon className={classNames(cls.icon, { [cls.visible]: !liked })} />
      <LikeFullIcon className={classNames(cls.icon, { [cls.visible]: liked })} />
    </button>
  )
}