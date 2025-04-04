import cls from './Button.module.scss'
import classNames from 'classnames'
import { PropsWithChildren, memo, HTMLProps } from 'react'

type BtnType = Omit<HTMLProps<HTMLButtonElement>, 'max'>

export interface ButtonProps  extends BtnType {
  className?: string
  max?: boolean
  big?: boolean
  center?: boolean
  dark?: boolean
  withMargin?: boolean,
  type?: 'button' | 'submit' | 'reset'
}
export const Button = memo(({
  className,
  children,
  big = false,
  center = false,
  dark = false,
  withMargin = false,
  max = false,
  ...rest
}: PropsWithChildren<ButtonProps>) => {

  return (
    <button className={classNames(
      cls.btn,
      { [cls.full]: max, [cls.big]: big, [cls.center]: center, [cls.dark]: dark, [cls.withMargin]: withMargin },
      [className])}
      {...rest}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'