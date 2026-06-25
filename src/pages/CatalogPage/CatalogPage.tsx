import cls from './CatalogPage.module.scss'
import classNames from 'classnames'
import { Breadcrumbs } from '@/shared/ui'
import { CatalogTabs } from '@/features/CatalogTabs/CatalogTabs'
import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import { SeoMeta } from '@/shared/libs'

const CatalogPage = memo(() => {
  const { t } = useTranslation()
  return (
    <div className={classNames(cls.catalogPage, 'container')}>
      <SeoMeta
        title="Каталог тату-машинок"
        description="Повний каталог тату-машинок: ротаційні, котушкові, пневматичні. Фільтрація за брендом, рівнем, типом."
      />
      <Breadcrumbs />
      <h1 className={classNames('pageTitle', cls.title)}>{t('catalog')}</h1>
      <CatalogTabs className={cls.tabs} />
    </div>
  )
})

export default CatalogPage
