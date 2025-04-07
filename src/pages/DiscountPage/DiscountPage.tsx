import cls from './DiscountPage.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { ProductCategory } from '@/entities'
import { Breadcrumbs,  FilterButton } from '@/shared/ui'
import { useCallback, useState } from 'react'
import { useLazyGetProductsQuery } from '@/pages/Home/blocks/Products/model/api/productsApi.ts'
import { ProductListWithBtn } from '@/entities'
import useFilters from './model/utils/useFilters/useFilters.tsx';

interface DiscountPageProps {
  className?: string
}

const filters: { id: ProductCategory, name: string}[] = [
  { id: 'tattoo-holders', name: 'tattoo holders' },
  { id: 'tattoo-machines', name: 'tattoo machines' },
  { id: 'tattoo-inks', name: 'tattoo inks' },
  { id: 'protection-containers-consumables', name: 'consumables' },
]
const itemPerPage = 10

const DiscountPage = ({ className }: DiscountPageProps) => {
  const { t } = useTranslation()
  const [limit, setLimit] = useState<number>(itemPerPage)

  const [trigger, { data, isFetching }] = useLazyGetProductsQuery()
  const { activeFilters, handleFilterClick } = useFilters(trigger, limit)

  const onLoadMore = useCallback(() => {
    setLimit(prev => prev + itemPerPage)
  }, [setLimit])

  if(!data) return null

  return (
    <div className={classNames(cls.discountPage, 'container', {}, [className])}>
      <Breadcrumbs />
      <h3 className={classNames("pageTitle", cls.title)}>{t('discounts')}</h3>
      <div className={cls.filters}>
        {filters.map((category) => (
          <FilterButton
            key={category.id}
            onClick={() => handleFilterClick(category.id)}
            isActive={activeFilters.includes(category.id)}
          >
            {t(category.name)}
          </FilterButton>
        ))}
      </div>

      <ProductListWithBtn
        productListClass={cls.products}
        products={data.machines}
        onLoadMoreClick={onLoadMore}
        isLoading={isFetching}
        showSeeMoreBtn={data.currentPage < data.totalPages}
      />
    </div>
  )
}

export default DiscountPage