import cls from './FilterButton.module.scss'
import classNames from 'classnames'
import { PropsWithChildren } from 'react'

interface FilterButtonProps {
  className?: string
  onClick?: () => void
  isActive?: boolean
}
export const FilterButton = ({
  className,
  children,
  onClick,
  isActive = false
}: PropsWithChildren<FilterButtonProps>) => {
  return (
    <button
      className={classNames(cls.filterButton, { [cls.active]: isActive }, [className])}
      type='button'
      onClick={onClick}
    >
      {children}
    </button>
  )
}