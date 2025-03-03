import cls from './Tabs.module.scss'
import classNames from 'classnames'
import { RefObject, useCallback, useRef } from 'react'
import { getElementPosition } from '@/shared/libs'

export const list = ['Bestsellers', 'Most Popular', 'New Arrivals', 'On Sale'] as const
export type TabType = typeof list[number]
export type TabPositions = Partial<Record<'top' | 'left' | 'width', number>>

interface TabProps {
  className?: string
  onClick: (position: TabPositions) => void
  isActive?: boolean
  name?: TabType
}

export const Tab = ({
  isActive = false,
  onClick,
  name
}: TabProps) => {
  const ref = useRef<HTMLLIElement>(null)

  const handleClick = useCallback((currentRef: RefObject<HTMLLIElement | null>) => {
    if(!currentRef.current) return
    const { width, top, left } = getElementPosition(currentRef.current)
    onClick?.({ width, top, left })
  }, [isActive])

  return (
    <li
      ref={ref}
      className={classNames('', {[cls.isActive]: isActive})}
      onClick={() => handleClick(ref)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleClick(ref);
        }
      }}
      tabIndex={0}
      aria-pressed={isActive}
      role="button"
    >
      {name}
    </li>
  )
}