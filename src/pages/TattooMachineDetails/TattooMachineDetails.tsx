import cls from './TattooMachineDetails.module.scss'
import classNames from 'classnames'
import { Breadcrumbs, DecoratedLink, CounterInput, Button } from '@/shared/ui'
import { currencyFormat, useDevice } from '@/shared/libs'
import { useTranslation } from 'react-i18next'
import { Additional } from './blocks/Additional/Additional.tsx'
import { TattooMachineSlider } from './blocks/TattooMachineSlider/TattooMachineSlider.tsx'
import { productsList, tattooWorks } from '@/mockData.tsx'
import { ProposeProducts } from './blocks/ProposeProducts/ProposeProducts.tsx'
import { CompleteSet } from './blocks/CompleteSet/CompleteSet.tsx'
import { TattooWorksModel } from '@/pages/TattooMachineDetails/blocks/TattooWorksSlider/TattooWorksSlider.tsx';
import { useState } from 'react'
import { useGetTattooMachineQuery, useGetRelatedTattooMachineQuery } from './model/api/tattooMachineApi.tsx'
import { useParams } from 'react-router'
import { Navigate } from 'react-router'
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx'
import { getAvailability } from './utils/getAvailability.ts'

interface TattooMachineDetailsProps {
  className?: string
}

const TattooMachineDetails = ({ className }: TattooMachineDetailsProps) => {
  const { t } = useTranslation()
  const { slug } = useParams()
  const isMobile = useDevice(1200)
  const [isModalOpened, setModalOpened] = useState(false)

  const closeModal = () => setModalOpened(false)
  const openModal = () => setModalOpened(true)

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
      <div className={classNames(cls.main, "container")}>
        <h2 className={cls.title}>
          {data.title}
        </h2>
        <div className={cls.slider}>
          <TattooMachineSlider
            slides={data.images}
            isMobile={isMobile}
            machineId={slug}
            tags={data.tags}
          />
        </div>
        <div className={cls.descriptWrapper}>
          <p className={cls.price}>
            <span className={cls.priceCurrent}>{currencyFormat(data.priceCurrent || data.price)}</span>
            {data.priceCurrent && <span className={cls.pricePrev}>{data.price}</span>}
          </p>

          <p className={cls.presence}>
            <span className={cls.presenceTitle}>{t('presence')}:</span>
            <span className={cls.presenceValue}>{t(getAvailability(data.stock))}</span>
          </p>

          <p className={cls.description}>
            {t('description')}<br />
            {data.shortDescription}
          </p>

          <div className={cls.link}>
            <DecoratedLink type="button" onClick={openModal}>
              {t('works made with this machine')}
            </DecoratedLink>
            <TattooWorksModel isOpen={isModalOpened} onClose={closeModal} list={tattooWorks}/>
          </div>
          <CounterInput  className={cls.counter}/>
          <Button dark withMargin className={cls.addBtn}>{t('add to cart')}</Button>
          <p className={cls.share}>{t('share')}</p>
        </div>
      </div>

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