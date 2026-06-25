import cls from './DiscountPage.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import type { ProductCategory } from '@/entities/ProductList/model/type/productSchema'
import { Breadcrumbs, ErrorMsg, FilterButton } from '@/shared/ui'
import { useCallback, useState } from 'react'
import { useGetProductsPaginatedQuery } from '@/entities/ProductList'
import { ProductListWithBtn } from '@/entities/ProductList/ProductListWithBtn'
import { TopLoader } from '@/shared/ui/Loaders'
import { FilterToolbar } from '@/widgets'
import { ResetFilters } from '@/features'
import { useProductFilters } from '@/widgets/FilterToolbar/model/useProductFilters'
import { SeoMeta } from '@/shared/libs'

const CATEGORY_FILTERS: { id: ProductCategory; name: string }[] = [
  { id: 'tattoo-holders', name: 'tattoo holders' },
  { id: 'tattoo-machines', name: 'tattoo machines' },
  { id: 'tattoo-inks', name: 'tattoo inks' },
  { id: 'protection-containers-consumables', name: 'consumables' },
]

const LIMIT = 20

const DiscountPage = () => {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const [activeCategories, setActiveCategories] = useState<ProductCategory[]>([])

  const { filterState, handlers, apiParams, isFiltersActive } = useProductFilters()

  const { data, isFetching, isError } = useGetProductsPaginatedQuery({
    page,
    limit: LIMIT,
    onlyDiscounted: true,
    ...(activeCategories.length ? { category: activeCategories } : {}),
    ...apiParams,
  })

  const handleCategoryClick = useCallback((categoryId: ProductCategory) => {
    setActiveCategories(prev => {
      const next = prev.includes(categoryId)
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
      return next
    })
    setPage(1)
  }, [])

  const handleLoadMore = useCallback(() => {
    if (data && page < data.totalPages) {
      setPage(p => p + 1)
    }
  }, [data, page])

  const handleReset = useCallback(() => {
    setPage(1)
    setActiveCategories([])
    handlers.handleReset()
  }, [handlers])

  const wrappedHandlers = {
    ...handlers,
    handleSortChange: (sort: typeof filterState.sort) => {
      setPage(1)
      handlers.handleSortChange(sort)
    },
    handlePriceChange: (min: number, max: number) => {
      setPage(1)
      handlers.handlePriceChange(min, max)
    },
    handleInStockChange: (inStock: boolean) => {
      setPage(1)
      handlers.handleInStockChange(inStock)
    },
    handleTagsChange: (tags: typeof filterState.tags) => {
      setPage(1)
      handlers.handleTagsChange(tags)
    },
    handleMotorTypesChange: (motorTypes: typeof filterState.motorTypes) => {
      setPage(1)
      handlers.handleMotorTypesChange(motorTypes)
    },
    handleNeedleTypesChange: (needleTypes: typeof filterState.needleTypes) => {
      setPage(1)
      handlers.handleNeedleTypesChange(needleTypes)
    },
  }

  const isCategoriesOrFiltersActive = isFiltersActive || activeCategories.length > 0

  return (
    <div className={classNames(cls.discountPage, 'container')}>
      <TopLoader isLoading={isFetching && !!data} />
      <SeoMeta
        title="Знижки та акції"
        description="Актуальні акції та знижки на тату-обладнання."
      />
      <Breadcrumbs />
      <h1 className={classNames('pageTitle', cls.title)}>{t('discounts')}</h1>

      <div className={cls.categoryFilters}>
        {CATEGORY_FILTERS.map((cat) => (
          <FilterButton
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            isActive={activeCategories.includes(cat.id)}
          >
            {t(cat.name)}
          </FilterButton>
        ))}
      </div>

      <FilterToolbar
        className={cls.filterToolbar}
        filterState={filterState}
        handlers={wrappedHandlers}
        showQuickFilters={false}
      />

      <ResetFilters
        className={cls.resetFilters}
        disabled={!isCategoriesOrFiltersActive}
        onReset={handleReset}
      />

      {isFetching && !data && (
        <div className={cls.initialLoader}>
          <TopLoader isLoading />
        </div>
      )}
      {isError && <ErrorMsg as="p" text={t('error_loading')} size="large" />}
      {data && (
        <ProductListWithBtn
          products={data.machines}
          onLoadMoreClick={handleLoadMore}
          isLoading={isFetching}
          showSeeMoreBtn={page < data.totalPages}
        />
      )}
    </div>
  )
}

export default DiscountPage
