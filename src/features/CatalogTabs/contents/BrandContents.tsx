import cls from './contents.module.scss'
import classNames from 'classnames'
import { catalogContent } from '../data.ts'
import { AppLink } from '@/shared/ui'
import { getCatalogPage } from '@/shared/config/routeConfig/routeConfig.tsx'

export const BrandContents = () => {
  return (
    <ul className={classNames(cls.contents, cls.brands)}>
      {catalogContent.brands.map((brand) => (
        <AppLink to={getCatalogPage(brand)} state={{ type: 'brand'}}>{brand}</AppLink>
      ))}
    </ul>
  )
}