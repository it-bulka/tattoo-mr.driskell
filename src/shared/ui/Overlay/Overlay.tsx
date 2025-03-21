import { memo } from 'react'

import classNames from 'classnames'

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
      className={classNames(cls.overlay, {}, [className])}
    />
  )
})
