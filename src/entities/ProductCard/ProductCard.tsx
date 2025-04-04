import cls from './ProductCard.module.scss'
import classNames from 'classnames'
import { TagType } from '@/shared/ui'
import { useState } from 'react';
import { Button, CardWithImgTagSlider } from '@/shared/ui'
import { useTranslation } from 'react-i18next'

export type Product = {
  images: string[]
  title: string
  price: number
  id: number | string
  tags: TagType[]
}

type StaticStatus = 'on-all' | 'on-mobile' | 'on-tablet'
interface ProductCardProps extends Product{
  className?: string
  staticOn?: StaticStatus
}

const mapStatic: Record<StaticStatus, string> = {
  'on-mobile': cls.staticOnMobile,
  'on-all': cls.staticOnAll,
  'on-tablet': cls.staticOnTablet
}

export const ProductCard = ({
  images,
  title,
  price,
  tags,
  id,
  staticOn = 'on-tablet'
}: ProductCardProps) => {
  const [isHovered, setHovered] = useState(false)
  const {t} = useTranslation()
  return (
    <div
      className={classNames(cls.productCard, {}, [mapStatic[staticOn]])}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CardWithImgTagSlider
        paginationId={String(id)}
        imgs={images}
        title={title}
        tags={tags}
        price={price}
        withAdaptation={false}
        itemId={String(id)}
      />

      <div className={classNames(cls.btnWrapper,  { [cls.isShown]: isHovered })}>
        <Button max className={cls.btn}>
          {t('add tot cart')}
        </Button>
      </div>
    </div>
  )
}