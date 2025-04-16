import { ProductCard } from '@/entities/ProductCard'
import { type Product } from '../ProductCard/ProductCard.tsx'
import cls from './ProductsList.module.scss'
import classNames from 'classnames'
import { getTattooMachineDetailsPage } from '@/shared/config/routeConfig/routeConfig.tsx'
import { useNavigate } from 'react-router'

interface ProductListProps {
  className?: string
  products: Product[]
}

// TODO: add virtualization
export const ProductList = ({ className, products }: ProductListProps) => {
  const navigate = useNavigate()

  return (
    <div className={classNames(cls.products, {}, [className])}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          images={product.images}
          title={product.title}
          price={product.price}
          tags={product.tags}
          onClick={() => navigate(getTattooMachineDetailsPage(String(product.id)))}
        />
      ))}
    </div>
  )
}