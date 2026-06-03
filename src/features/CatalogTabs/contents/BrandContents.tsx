import cls from './contents.module.scss'
import classNames from 'classnames'
import { AppLink } from '@/shared/ui'
import { getCatalogBrandsPage } from '@/shared/config/routeConfig/routeConfig.tsx'
import { useGetBrandsQuery } from '@/entities/Brand'
import { useTranslation } from 'react-i18next'

export const BrandContents = () => {
  const { i18n } = useTranslation()
  const { data: brands = [] } = useGetBrandsQuery(i18n.language)

  return (
    <ul className={classNames(cls.contents, cls.brands)}>
      {brands.map((brand) => (
        <AppLink key={brand.slug} to={getCatalogBrandsPage(brand.slug)} state={{ type: 'brand' }}>
          {brand.name}
        </AppLink>
      ))}
    </ul>
  )
}
