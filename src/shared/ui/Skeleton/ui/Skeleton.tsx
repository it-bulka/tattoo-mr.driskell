import { memo, type CSSProperties } from 'react'
import classNames from 'classnames'
import cls from './Skeleton.module.scss'

interface SkeletonProps {
  className?: string
  height?: string | number
  width?: string | number
  border?: string
  variant?: 'light' | 'dark'
}

export const Skeleton = memo(({
  className,
  height,
  width,
  border,
  variant = 'light',
}: SkeletonProps) => {
  const style: CSSProperties = {
    height,
    width,
    borderRadius: border,
  }

  return (
    <div
      className={classNames(cls.skeleton, { [cls.dark]: variant === 'dark' }, [className])}
      style={style}
    />
  )
})

Skeleton.displayName = 'Skeleton'
