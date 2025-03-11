import cls from './contents.module.scss'
import classNames from 'classnames'
import { catalogContent } from '../data.ts'
import { AppLink } from '@/shared/ui'
import { getCatalogDetailsPage } from '@/shared/config/routeConfig/routeConfig.tsx'

export const BrandContents = () => {
  return (
    <ul className={classNames(cls.contents, cls.brands)}>
      {catalogContent.brands.map((brand) => (
        <AppLink to={getCatalogDetailsPage(brand)} state={{ type: 'brand'}}>{brand}</AppLink>
      ))}
    </ul>
  )
}