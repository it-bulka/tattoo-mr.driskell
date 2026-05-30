import cls from './AuthTitle.module.scss'
import { PropsWithChildren } from 'react'

export const AuthTitle = ({ children }: PropsWithChildren) => {
  return (
    <h2 className={cls.title}>{children}</h2>
  )
}