import { memo } from 'react'
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

export const ProductList = memo(({ className, products }: ProductListProps) => {
  const navigate = useNavigate()

  return (
    <div className={classNames(cls.products, {}, [className])}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => navigate(getTattooMachineDetailsPage(String(product.id)))}
        />
      ))}
    </div>
  )
})