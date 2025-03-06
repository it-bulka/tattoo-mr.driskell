import { productsList } from '@/mockData.tsx';
import { ProductCard } from '@/entities/ProductCard';
import { currencyFormat } from '@/shared/libs';
import { type Product } from '../ProductCard/ProductCard.tsx'
import cls from './ProductsList.module.scss'
import classNames from 'classnames';

interface ProductListProps {
  className?: string
  products?: Product[]
}
export const ProductList = ({ className }: ProductListProps) => {
  return (
    <div className={classNames(cls.products, {}, [className])}>
      {productsList.map((product) => (
        <ProductCard
          key={product.id}
          imgs={product.imgs}
          title={product.title}
          price={currencyFormat(product.price)}
        />
      ))}
    </div>
  )
}