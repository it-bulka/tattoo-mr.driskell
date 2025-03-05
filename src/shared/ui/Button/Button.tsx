import cls from './Button.module.scss'
import classNames from 'classnames'
import { PropsWithChildren, memo } from 'react'

interface ButtonProps {
  className?: string
  max?: boolean
  big?: boolean
  center?: boolean
  dark?: boolean
  withMargin?: boolean
}
export const Button = memo(({
  className,
  children,
  big = false,
  center = false,
  dark = false,
  withMargin = false,
  max = false
}: PropsWithChildren<ButtonProps>) => {

  return (
    <button className={classNames(
      cls.btn,
      { [cls.full]: max, [cls.big]: big, [cls.center]: center, [cls.dark]: dark, [cls.withMargin]: withMargin },
      [className])}>
      {children}
    </button>
  )
})

Button.displayName = 'Button'