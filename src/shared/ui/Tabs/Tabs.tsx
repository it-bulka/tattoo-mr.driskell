import cls from './Tabs.module.scss'
import classNames from 'classnames'
import { CSSProperties, useMemo, useState } from 'react';
import { Tab, list, type TabType, TabPositions } from './Tab.tsx'


interface TabsProps {
  className?: string
  onClick?: (tab: TabType) => void
}
export const Tabs = ({ className, onClick }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<TabType>(list[0])
  const [elPosition, setElPosition] = useState<TabPositions | null>(null)

  const onClickItem = (clickedTab: TabType) => (position: TabPositions) => {
    setActiveTab(clickedTab)
    setElPosition(position)
    onClick?.(clickedTab)
  }

  const decoratorPosition: CSSProperties = useMemo(() => {
    if (!elPosition) return { opacity: 1 }
    const { width, left } = elPosition
    return { width: width, left: left, bottom: 0 }
  }, [elPosition])

  return (
    <ul className={classNames(cls.tabs, {}, [className])}>
      {list.map((item) => (
        <Tab
          isActive={activeTab === item}
          onClick={onClickItem(item)}
          name={item}
        />
      ))}
      <div className={classNames("decorator full withTransition", cls.decorator)} style={decoratorPosition} />
    </ul>
  )
}