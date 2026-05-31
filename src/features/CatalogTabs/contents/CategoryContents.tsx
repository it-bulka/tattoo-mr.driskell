import cls from './contents.module.scss'
import classNames from 'classnames'
import { catalogContent } from '../data.ts'
import { AppLink } from '@/shared/ui'
import { getCatalogDetailsPage } from '@/shared/config/routeConfig/routeConfig.tsx'

const toSlug = (s: string) => s.toLowerCase().replace(/[,\s]+/g, '-')

export const CategoryContents = () => {
  return (
    <ul className={classNames(cls.contents, cls.categories)}>
      {catalogContent.category.map((category) => (
        <AppLink to={getCatalogDetailsPage(toSlug(category))} state={{ type: 'category'}}>{category}</AppLink>
      ))}
    </ul>
  )
}