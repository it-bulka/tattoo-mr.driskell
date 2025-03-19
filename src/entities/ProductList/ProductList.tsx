import { ProductCard } from '@/entities/ProductCard'
import { type Product } from '../ProductCard/ProductCard.tsx'
import cls from './ProductsList.module.scss'
import classNames from 'classnames'

interface ProductListProps {
  className?: string
  products: Product[]
}
export const ProductList = ({ className, products }: ProductListProps) => {
  return (
    <div className={classNames(cls.products, {}, [className])}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          imgs={product.imgs}
          title={product.title}
          price={product.price}
          tags={product.tags}
        />
      ))}
    </div>
  )
}