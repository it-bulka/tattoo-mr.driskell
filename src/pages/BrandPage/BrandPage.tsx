import cls from './BrandPage.module.scss'
import classNames from 'classnames'
import { Breadcrumbs } from '@/shared/ui'
import { productsList } from '@/mockData.tsx'
import { useTranslation } from 'react-i18next'
import { ProductList } from '@/entities'
import { catalogContent } from '@/features/CatalogTabs/data.ts'
import { FilterButton } from '@/shared/ui'
import BrandImg from '@/shared/assets/pages/brands/kuro-sumi.png'
import { memo } from 'react'
import { useParams } from 'react-router';

interface BrandPageProps {
  className?: string
}
// TODO: add back
const BrandPage = memo(({ className }: BrandPageProps) => {
  const { t } = useTranslation('catalog')
  const { slug } = useParams()

  return (
    <div className={classNames(cls.brandsPage, 'container', {}, [className])}>
      <Breadcrumbs />
      <div className={cls.brand}>
        <img src={BrandImg} alt={`${slug} logo`}/>
        <h3 className="pageTitle">{slug}</h3>
      </div>
      <div className={cls.filters}>
        {catalogContent.category.map((category) => (
          <FilterButton key={category}>{t(category)}</FilterButton>
        ))}
      </div>
      <ProductList className={cls.products} products={productsList} />
    </div>
  )
})

export default BrandPage