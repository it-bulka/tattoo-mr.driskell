import cls from './contents.module.scss'
import classNames from 'classnames'
import { catalogContent } from '../data.ts'
import { AppLink } from '@/shared/ui'
import { getCatalogDetailsPage } from '@/shared/config/routeConfig/routeConfig.tsx'
import { useTranslation } from 'react-i18next'
import { memo } from 'react';

const toSlug = (s: string) => s.toLowerCase().replace(/[,\s]+/g, '-')

export const CategoryContents = memo(() => {
  const { t } = useTranslation()
  return (
    <ul className={classNames(cls.contents, cls.categories)}>
      {catalogContent.category.map((category) => (
        <AppLink key={category} to={getCatalogDetailsPage(toSlug(category))} state={{ type: 'category'}}>{t(category)}</AppLink>
      ))}
    </ul>
  )
})
CategoryContents.displayName = 'CategoryContents'