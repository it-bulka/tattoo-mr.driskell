import cls from './Tabs.module.scss'
import classNames from 'classnames'
import { RefObject, useCallback, useRef } from 'react'
import { getElementPosition } from '@/shared/libs'

export type TabType<T extends string, K extends string | number> = {id: K, name: T }
export type TabPositions = Partial<Record<'top' | 'left' | 'width', number>>

interface TabProps<T extends string, K extends string | number> {
  className?: string
  onClick: (position: TabPositions) => void
  isActive?: boolean
  tab: TabType<T, K>
}

export const Tab = <T extends string, K extends string | number>({
  isActive = false,
  onClick,
  tab
}: TabProps<T, K>) => {
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
      {tab.name}
    </li>
  )
}