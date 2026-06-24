import cls from './AuthTitle.module.scss'
import classNames from 'classnames'
import { PropsWithChildren } from 'react'

interface AuthTitleProps {
  className?: string
}

export const AuthTitle = ({ className, children }: PropsWithChildren<AuthTitleProps>) => {
  return (
    <h2 className={classNames(cls.title, className)}>{children}</h2>
  )
}