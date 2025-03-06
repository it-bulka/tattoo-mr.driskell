import cls from './CategoriesPage.module.scss'
import classNames from 'classnames'
import { Breadcrumbs, Button } from '@/shared/ui'
import { FilterToolbar } from '@/widgets'
import { productsList } from '@/mockData.tsx'
import { useTranslation } from 'react-i18next'
import { ProductList } from '@/entities'

interface CategoryPageProps {
  className?: string
  slug: string
}
export const CategoriesPage = ({ className, slug }: CategoryPageProps) => {
  const { t } = useTranslation('catalog')
  return (
    <div className={classNames(cls.categoriesPage, 'container', {}, [className])}>
      <Breadcrumbs />
      <h3 className={cls.title}>{slug}</h3>
      <FilterToolbar className={cls.filterToolbar} />
      <ProductList className={cls.products} products={productsList} />
      <Button big className={cls.seeMore}>{t('see more')}</Button>
    </div>
  )
}