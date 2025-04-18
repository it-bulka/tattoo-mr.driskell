import cls from './ErrorMsg.module.scss'
import classNames from 'classnames'
import { memo } from 'react'

type ErrSizeType = 'small' | 'medium' | 'large'
interface ErrorMsgProps {
  as?: 'span' | 'p' | 'div'
  text?: string
  className?: string
  size?: ErrSizeType
}

const errSizeToMap: Record<ErrSizeType, string> = {
  small: cls.s,
  medium: cls.m,
  large: cls.l,
}

export const ErrorMsg = memo(({
  as = 'span',
  text,
  className,
  size = 'small',
}: ErrorMsgProps) => {
  if(!text) return null

  const Tag = as

  return <Tag className={classNames(cls.err, {}, [className, errSizeToMap[size]])}>{text}</Tag>
})