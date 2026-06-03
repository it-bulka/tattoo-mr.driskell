import { memo } from 'react'
import { AppLink } from '@/shared/ui'
import { getCatalogBrandsPage } from '@/shared/config/routeConfig/routeConfig.tsx'
import type { Brand } from '@/entities/Brand'
import cls from './BrandCard.module.scss'

interface BrandCardProps {
  brand: Brand
}

export const BrandCard = memo(({ brand }: BrandCardProps) => (
  <AppLink to={getCatalogBrandsPage(brand.slug)} className={cls.card}>
    <img
      src={brand.imgUrl || '/default.png'}
      alt={brand.name}
      className={cls.img}
      onError={(e) => { e.currentTarget.src = '/default.png' }}
    />
    <span className={cls.name}>{brand.name}</span>
  </AppLink>
))
