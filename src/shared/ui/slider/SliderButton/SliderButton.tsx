import cls from './SliderButton.module.scss'
import classNames from 'classnames'
import ArrowLeftIcon from '@/shared/assets/general/arrow-left.svg?react'

interface SliderButtonProps {
  className?: string
  next?: boolean
  onClick?: () => void
}
export const SliderButton = ({
  className,
  next = false,
  onClick
}: SliderButtonProps) => {
  return (
    <button className={classNames(cls.btn, { [cls.next]: next }, [className])} onClick={() => onClick?.()}>
      <ArrowLeftIcon />
    </button>
  )
}