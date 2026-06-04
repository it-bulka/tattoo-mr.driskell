import cls from './TattooMachineDetails.module.scss'
import classNames from 'classnames'
import { Breadcrumbs } from '@/shared/ui'
import { useTranslation } from 'react-i18next'
import { Additional } from './blocks/Additional/Additional.tsx'
import { ProposeProducts } from './blocks/ProposeProducts/ProposeProducts.tsx'
import { CompleteSet } from './blocks/CompleteSet/CompleteSet.tsx'
import { useGetTattooMachineQuery, useGetRelatedTattooMachineQuery } from './model/api/tattooMachineApi.tsx'
import { useParams, Navigate } from 'react-router'
import { RoutePaths, getCatalogBrandsPage } from '@/shared/config/routeConfig/routeConfig.tsx'
import { MainBlock } from './blocks/Main/MainBlock.tsx'
import { TattooMachineDetailsPageLoader } from './TattooMachineDetailsPageLoader'

interface TattooMachineDetailsProps {
  className?: string
}

const TattooMachineDetails = ({ className }: TattooMachineDetailsProps) => {
  const { t } = useTranslation()
  const { slug } = useParams()

  const { data, isLoading } = useGetTattooMachineQuery(
    { id: slug || '' },
    {
      skip: !slug,
      refetchOnMountOrArgChange: false,
    }
  )

  const { data: related } = useGetRelatedTattooMachineQuery(
    { id: slug || '' },
    {
      skip: !slug,
      refetchOnMountOrArgChange: false,
    }
  )

  if(!slug || (!isLoading && !data)) return <Navigate to={RoutePaths.not_found} />
  if (!data) return <TattooMachineDetailsPageLoader />

  return (
    <div className={classNames(cls.page, {}, [className])}>
      <Breadcrumbs  className="container" customLastCrumb={data.title} />
      <MainBlock data={data} slug={slug} />

      <Additional
        className="container"
        description={data.longDescription}
        specs={data.specs}
      />

      {related?.combo && (
        <CompleteSet
          combo={related.combo}
          bundleDiscountTiers={related.bundleDiscountTiers}
        />
      )}

      {related?.recommended && (
        <ProposeProducts
          title={t('recommended product')}
          products={related.recommended}
          sliderId={'recommended_products'}
          hideLink
        />
      )}

      {related?.brands && (
        <ProposeProducts
          title={t('products from this brand')}
          products={related.brands}
          sliderId={'brands_products'}
          linkTo={data.brand ? getCatalogBrandsPage(data.brand.slug) : '/'}
        />
      )}

      {related?.similar && (
        <ProposeProducts
          title={t('similar products')}
          products={related?.similar}
          sliderId={'similar_products'}
          hideLink
        />
      )}
    </div>
  )
}
export default TattooMachineDetails
