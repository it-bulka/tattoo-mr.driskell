import cls from './CatalogPage.module.scss'
import classNames from 'classnames'
import { Breadcrumbs } from '@/shared/ui'
import { CatalogTabs } from '@/features/CatalogTabs/CatalogTabs'
import { useTranslation } from 'react-i18next'
import { memo } from 'react'

const CatalogPage = memo(() => {
  const { t } = useTranslation()
  return (
    <div className={classNames(cls.catalogPage, 'container')}>
      <Breadcrumbs />
      <h3 className={classNames('pageTitle', cls.title)}>{t('catalog')}</h3>
      <CatalogTabs className={cls.tabs} />
    </div>
  )
})

export default CatalogPage
