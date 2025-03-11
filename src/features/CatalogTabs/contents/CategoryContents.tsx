import cls from './contents.module.scss'
import classNames from 'classnames'
import { catalogContent } from '../data.ts'
import { AppLink } from '@/shared/ui'
import { getCatalogDetailsPage } from '@/shared/config/routeConfig/routeConfig.tsx'

export const CategoryContents = () => {
  return (
    <ul className={classNames(cls.contents, cls.categories)}>
      {catalogContent.category.map((category) => (
        <AppLink to={getCatalogDetailsPage(category)} state={{ type: 'category'}}>{category}</AppLink>
      ))}
    </ul>
  )
}