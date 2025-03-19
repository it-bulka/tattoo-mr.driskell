import cls from '../Home.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Button, Tabs } from '@/shared/ui';
import { productsList } from '@/mockData.tsx'
import { ProductList, ProductsSlider } from '@/entities'
import { useDevice } from '@/shared/libs';

interface ProductsProps {
  className?: string
}

const productsTabs = [
  {id:1, name: 'Bestsellers'},
  {id:2, name: 'Most Popular'},
  {id:3, name: 'New Arrivals'},
  {id:4, name: 'On Sale'},
]

export const Products = ({ className }: ProductsProps) => {
  const { t } = useTranslation()
  const isMobile = useDevice(1200)

  return (
    <div className={classNames('', 'container', {}, [className])}>
      <Tabs className={cls.tabs} tabs={productsTabs} justify="between"/>

      {isMobile
        ? <ProductsSlider list={productsList} sliderId={'products'} />
        : (
          <>
            <ProductList products={productsList} />
            <Button big className={cls.seeMore}>{t('see more')}</Button>
          </>
        )
      }
    </div>
  )
}