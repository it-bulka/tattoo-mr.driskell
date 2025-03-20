import clsGeneral from '../../TattooMachineDetails.module.scss'
import classNames from 'classnames'
import { Product } from '@/entities/ProductCard/ProductCard.tsx'
import { NavigationSlider, CardWithImgTagSlider, AppLink, PaginationSlider } from '@/shared/ui'
import { SwiperSlide } from 'swiper/react'
import { useTranslation } from 'react-i18next'
import { useDevice } from '@/shared/libs';

interface ProposeProductsProps {
  title: string
  products: Product[]
  sliderId: string
  linkTo?: string
}


export const ProposeProducts = ({
  title,
  sliderId,
  products,
  linkTo = '/'
}: ProposeProductsProps) => {
  const {t} = useTranslation()
  const isTablet = useDevice(1200)
  const isMobile = useDevice(768)

  const content = (
    <>
      {products.map(product => (
        <SwiperSlide key={product.id}>
          <CardWithImgTagSlider
            paginationId={sliderId + product.id}
            imgs={product.imgs}
            title={product.title}
            tags={product.tags}
            price={product.price}
          />
        </SwiperSlide>
      ))}
    </>
  )
  return (
    <>
      <div className={classNames("container", clsGeneral.blockHeader)}>
        <h5 className="pageTitle margin-0">{title}</h5>
        <AppLink to={linkTo} className={clsGeneral.headerLink}>{t('see all')}</AppLink>
      </div>

      {isTablet ? (
        <PaginationSlider
          paginationId={sliderId}
          dotsPosition={'outside'}
          dotsType={isMobile ? 'small' : 'large'}
          slidesPerView={isMobile ? 2 : 3}
          spaceBetween={20}
          speed={1200}
          loop
          className="container"
        >
          {content}
        </PaginationSlider>
      ) : (
        <NavigationSlider loop speed={1200}>{content}</NavigationSlider>
      )}


    </>
  )
}