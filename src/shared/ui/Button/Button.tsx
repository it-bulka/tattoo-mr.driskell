import cls from './Button.module.scss'
import classNames from 'classnames'
import { PropsWithChildren } from 'react'

interface ButtonProps {
  className?: string
  max?: boolean
}
export const Button = ({
  className,
  children,
  max = false
}: PropsWithChildren<ButtonProps>) => {

  return (
    <button className={classNames(cls.btn, { [cls.full]: max }, [className])}>
      {children}
    </button>
  )
}