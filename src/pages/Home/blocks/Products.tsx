import cls from '../Home.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Button, Tabs } from '@/shared/ui';
import { productsList } from '@/mockData.tsx'
import { ProductList } from '@/entities'

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

  return (
    <div className={classNames(cls.Products, 'container', {}, [className])}>
      <Tabs className={cls.tabs} tabs={productsTabs} justify="between"/>
      <ProductList className={cls.products} products={productsList} />
      <Button big className={cls.seeMore}>{t('see more')}</Button>
    </div>
  )
}