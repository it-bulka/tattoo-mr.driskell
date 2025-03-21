import cls from './CategoriesPage.module.scss'
import classNames from 'classnames'
import { Breadcrumbs, Button } from '@/shared/ui'
import { FilterToolbar } from '@/widgets'
import { productsList } from '@/mockData.tsx'
import { useTranslation } from 'react-i18next'
import { ProductList } from '@/entities'

const CategoriesPage = () => {
  const { t } = useTranslation()
  return (
    <div className={classNames(cls.categoriesPage, 'container')}>
      <Breadcrumbs />
      <h3 className={classNames("pageTitle", cls.title)}>{t('tattoo machines')}</h3>
      <FilterToolbar className={cls.filterToolbar} />
      <ProductList className={cls.products} products={productsList} />
      <Button big className={cls.seeMore}>{t('see more')}</Button>
    </div>
  )
}

export default CategoriesPage