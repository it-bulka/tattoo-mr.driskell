import cls from './Additional.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Tabs } from '@/shared/ui'
import { TabType } from '@/shared/ui/Tabs/Tab.tsx'
import { useMemo, useState, memo } from 'react'
import { tattooMachineDetails } from '@/mockData.tsx';

interface DesctiptionTabsProps {
  className?: string
}

const tabs = [
  {id: 'description', name: 'description' },
  {id: 'specifications', name: 'specifications' },
  {id: 'testimonials', name: 'testimonials' }
] as const

type TabIds = typeof tabs[number]['id'];
const content = (
  <div className={cls.content}>
    {tattooMachineDetails.description.map((item, i) => (
      <p key={i}>{item}</p>
    ))}
  </div>
)

const tabsContent: Record<TabIds, any> = {
  description:  content,
  specifications:  content,
  testimonials:  content
}

export const DesctiptionTabs = memo(({ className }: DesctiptionTabsProps) => {
  const { t } = useTranslation()
  const translatedTabs = useMemo(() => {
    return tabs.map(tab => ({...tab, name: t(tab.name) }))
  }, [t])
  const [activeTab, setActiveTab] = useState<TabType<string, TabIds>>(translatedTabs[0])


  return (
    <div className={classNames(cls.desctiptionTabs, {}, [className])}>
      <Tabs tabs={translatedTabs} onClick={setActiveTab} className={cls.tabs} />
      <div className={cls.content}>
        {tabsContent[activeTab.id]}
      </div>
    </div>
  )
})