import cls from './CardsGrid.module.scss'
import { PropsWithChildren, memo } from 'react'
import classNames from 'classnames'

interface CardsGridProps {
  className?: string
}

export const CardsGrid = memo(({ children, className }: PropsWithChildren<CardsGridProps>) => {
  return (
    <div className={classNames(cls.cards, [className])}>
      {children}
    </div>
  )
})

CardsGrid.displayName = 'CardsGrid'