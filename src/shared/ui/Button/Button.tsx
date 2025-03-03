import cls from './Button.module.scss'
import classNames from 'classnames'
import { PropsWithChildren, memo } from 'react'

interface ButtonProps {
  className?: string
  max?: boolean
  big?: boolean
  center?: boolean
}
export const Button = memo(({
  className,
  children,
  big = false,
  center = false,
  max = false
}: PropsWithChildren<ButtonProps>) => {

  return (
    <button className={classNames(cls.btn, { [cls.full]: max, [cls.big]: big, [cls.center]: center }, [className])}>
      {children}
    </button>
  )
})

Button.displayName = 'Button'