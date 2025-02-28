import cls from './Tag.module.scss'
import classNames from 'classnames'
import { PropsWithChildren } from 'react'

interface TagProps {
  className?: string
  type?: 'new' | 'hit' | 'promotion' | 'absent' | 'discount'
}
export const Tag = ({
  className,
  children,
  type = 'new',
}: PropsWithChildren<TagProps>) => {


  return (
    <span className={classNames(cls.tag, {}, [className, cls[type]])}>
      {children}
    </span>
  )
}