import cls from './DiscountBadge.module.scss'
import classNames from 'classnames'
import { memo } from 'react'

interface DiscountBadgeProps {
  price: number
  priceCurrent: number
  className?: string
}

export const DiscountBadge = memo(({ price, priceCurrent, className }: DiscountBadgeProps) => {
  if (!priceCurrent || priceCurrent >= price) return null

  const percent = Math.round(((price - priceCurrent) / price) * 100)

  return (
    <span className={classNames(cls.badge, className)}>
      -{percent}%
    </span>
  )
})

DiscountBadge.displayName = 'DiscountBadge'
