import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useGetBrandsQuery } from '@/entities/Brand'
import { Breadcrumbs, ErrorMsg } from '@/shared/ui'
import { BrandCard } from './BrandCard.tsx'
import { BrandsListLoader } from './BrandsListLoader'
import cls from './BrandsPage.module.scss'

const BrandsPage = memo(() => {
  const { t, i18n } = useTranslation()
  const { data: brands = [], isLoading, isError } = useGetBrandsQuery(i18n.language)

  return (
    <div className={cls.brandsPage + ' container'}>
      <Breadcrumbs />
      <h3 className={'pageTitle ' + cls.title}>{t('brands')}</h3>
      {isLoading && <BrandsListLoader />}
      {isError && <ErrorMsg />}
      {!isLoading && !isError && (
        <div className={cls.grid}>
          {brands.map(brand => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      )}
    </div>
  )
})

export default BrandsPage
