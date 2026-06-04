import { memo, type CSSProperties } from 'react'
import classNames from 'classnames'
import cls from './Skeleton.module.scss'

interface SkeletonProps {
  className?: string
  height?: string | number
  width?: string | number
  border?: string
  variant?: 'light' | 'dark'
  style?: CSSProperties
}

export const Skeleton = memo(({
  className,
  height,
  width,
  border,
  variant = 'light',
  style,
}: SkeletonProps) => {
  const inlineStyle: CSSProperties = {
    height,
    width,
    borderRadius: border,
    ...style,
  }

  return (
    <div
      className={classNames(cls.skeleton, { [cls.dark]: variant === 'dark' }, [className])}
      style={inlineStyle}
    />
  )
})

Skeleton.displayName = 'Skeleton'
