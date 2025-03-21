import { memo } from 'react'

import classnames from '@/shared/libs/classnames/classnames'

import cls from './Overlay.module.scss'

interface OverlayProps {
  className?: string;
  onClick?: () => void;
}

export const Overlay = memo((props: OverlayProps) => {
  const { className, onClick } = props

  return (
    <div
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
      aria-label="Close overlay"
      className={classnames(cls.overlay, {}, [className])}
    />
  )
})
