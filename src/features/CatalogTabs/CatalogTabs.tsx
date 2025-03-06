import cls from './CatalogTabs.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Tabs } from '@/shared/ui'
import { CatalogTabName, catalogTabsList, CatalogTabsObject } from './data.ts'
import { useState, ReactNode, memo, useMemo, useRef } from 'react'
import { BrandContents } from './contents/BrandContents.tsx'
import { CategoryContents } from './contents/CategoryContents.tsx'

interface CatalogTabsProps {
  className?: string
}
const catalogTabsContent: CatalogTabsObject<ReactNode> = {
  'category': <CategoryContents />,
  'brands': <BrandContents />,
}
export const CatalogTabs = memo(({ className }: CatalogTabsProps) => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<CatalogTabName>(catalogTabsList[0].id)
  const ref = useRef<HTMLDivElement>(null)

  const list = useMemo(() => {
    return catalogTabsList.map(item => ({
      ...item,
      name: t(item.name)
    }))
  }, [t])

  return (
    <div className={classNames(cls.catalogTabs, {}, [className])}>
      <div className={cls.tabs}>
        <Tabs
          tabs={list}
          onClick={(clickedTab) => setActiveTab(clickedTab.id)}
          className={cls.tabsInner}
        />

        <div className="decorator full croppedPoligon gray"/>
      </div>
      <div className={cls.content} ref={ref}>
        {catalogTabsContent[activeTab]}
      </div>
    </div>
  )
})