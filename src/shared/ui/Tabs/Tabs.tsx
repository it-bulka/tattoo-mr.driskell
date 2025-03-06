import cls from './Tabs.module.scss'
import classNames from 'classnames'
import { CSSProperties, useMemo, useState } from 'react';
import { Tab, type TabType, TabPositions } from './Tab.tsx'

interface TabsProps<T extends string, K extends string | number> {
  className?: string
  onClick?: (tab: TabType<T, K>) => void
  tabs: TabType<T, K>[]
  initialActiveTabId?: TabType<T, K>['id']
  justify?: 'start' | 'end' | 'between'
}
export const Tabs = <T extends string, K extends string | number>({
  className,
  onClick,
  tabs,
  initialActiveTabId,
  justify = 'start',

}: TabsProps<T, K>) => {
  const [activeTab, setActiveTab] = useState<TabType<T, K>['id']>(initialActiveTabId || tabs[0].id)
  const [elPosition, setElPosition] = useState<TabPositions | null>(null)

  const onClickItem = (clickedTab: TabType<T, K>) => (position: TabPositions) => {
    setActiveTab(clickedTab.id)
    setElPosition(position)
    onClick?.(clickedTab)
  }

  const decoratorPosition: CSSProperties = useMemo(() => {
    if (!elPosition) return { opacity: 1 }
    const { width, left } = elPosition
    return { width: width, left: left, bottom: 0 }
  }, [elPosition])

  return (
    <ul className={classNames(cls.tabs, {}, [cls[justify], className])}>
      {tabs.map((item) => (
        <Tab
          isActive={activeTab === item.id}
          onClick={onClickItem(item)}
          tab={item}
        />
      ))}
      <div className={classNames("decorator full withTransition", cls.decorator)} style={decoratorPosition} />
    </ul>
  )
}