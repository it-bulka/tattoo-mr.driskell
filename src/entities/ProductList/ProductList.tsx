import { ProductCard } from '@/entities/ProductCard'
import { type Product } from '../ProductCard/ProductCard.tsx'
import cls from './ProductsList.module.scss'
import classNames from 'classnames'
import { Link } from 'react-router'
import { getTattooMachineDetailsPage } from '@/shared/config/routeConfig/routeConfig.tsx'

interface ProductListProps {
  className?: string
  products: Product[]
}

// TODO: add virtualization
export const ProductList = ({ className, products }: ProductListProps) => {
  return (
    <div className={classNames(cls.products, {}, [className])}>
      {products.map((product) => (
        <Link to={getTattooMachineDetailsPage(String(product.id))} key={product.id}>
          <ProductCard
            key={product.id}
            id={product.id}
            images={product.images}
            title={product.title}
            price={product.price}
            tags={product.tags}
          />
        </Link>

      ))}
    </div>
  )
}