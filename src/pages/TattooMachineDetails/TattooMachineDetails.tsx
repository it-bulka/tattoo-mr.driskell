import cls from './TattooMachineDetails.module.scss'
import classNames from 'classnames'
import { Breadcrumbs } from '@/shared/ui'
import { useTranslation } from 'react-i18next'
import { Additional } from './blocks/Additional/Additional.tsx'
import { productsList } from '@/mockData.tsx'
import { ProposeProducts } from './blocks/ProposeProducts/ProposeProducts.tsx'
import { CompleteSet } from './blocks/CompleteSet/CompleteSet.tsx'
import { useGetTattooMachineQuery, useGetRelatedTattooMachineQuery } from './model/api/tattooMachineApi.tsx'
import { useParams, Navigate } from 'react-router'
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx'
import { MainBlock } from './blocks/Main/MainBlock.tsx'

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
  if (!data) return null

  return (
    <div className={classNames(cls.page, {}, [className])}>
      <Breadcrumbs  className="container" customLastCrumb={data.title} />
      <MainBlock data={data} slug={slug} />

      <Additional
        className="container"
        description={data.longDescription}
        specs={data.specs}
        category={data.category}
      />

      {related?.combo && <CompleteSet combo={related?.combo}/>}

      {related?.recommended && (
        <ProposeProducts
          title={t('recommended product')}
          products={related.recommended}
          sliderId={'recommended_products'}
        />
      )}

      {related?.brands && (
        <ProposeProducts
          title={t('products from this brand')}
          products={productsList}
          sliderId={'brands_products'}
        />
      )}

      {related?.similar && (
        <ProposeProducts
          title={t('similar products')}
          products={related?.similar}
          sliderId={'similar_products'}
        />
      )}
    </div>
  )
}
export default TattooMachineDetails