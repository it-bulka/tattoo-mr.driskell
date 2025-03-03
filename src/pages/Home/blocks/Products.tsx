import cls from '../Home.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Button, Tabs } from '@/shared/ui';
import { ProductCard } from '@/entities/ProductCard';
import { currencyFormat } from '@/shared/libs';
import ProductImg from '@/shared/assets/toDelete/product.png';
import ProductImg2 from '@/shared/assets/toDelete/product-2.png';
import ProductImg3 from '@/shared/assets/toDelete/product-3.png';
import ProductImg4 from '@/shared/assets/toDelete/product-4.png';

interface ProductsProps {
  className?: string
}

type Product = {
  imgs: string[]
  title: string
  price: number
  id: number | string
}

// TODO:connect to back
const productsList: Product[] = Array.from({ length: 10 }, (_, index) => ({
  imgs: [ProductImg, ProductImg2, ProductImg3, ProductImg4],
  title: 'Foxxx Kitsune Mini Black Vintage RCA',
  price: 6000,
  id: index
}))

export const Products = ({ className }: ProductsProps) => {
  const { t } = useTranslation()

  return (
    <div className={classNames(cls.Products, 'container', {}, [className])}>
      <Tabs className={cls.tabs}/>
      <div className={cls.products}>
        {productsList.map((product) => (
          <ProductCard
            key={product.id}
            imgs={product.imgs}
            title={product.title}
            price={currencyFormat(product.price)}
          />
        ))}
      </div>
      <Button big className={cls.seeMore}>{t('see more')}</Button>
    </div>
  )
}