import cls from './CloseBtn.module.scss'
import classNames from 'classnames'
import CloseIcon from '@/shared/assets/general/close.svg?react'
import { memo } from 'react'

interface CloseBtnProps {
  className?: string
  onClick?: () => void
}
export const CloseBtn = memo(({ className, onClick }: CloseBtnProps) => {
  return (
    <button className={classNames(cls.closeBtn, {}, [className])} onClick={onClick}>
      <CloseIcon />
    </button>
  )
})

CloseBtn.displayName = 'CloseBtn'