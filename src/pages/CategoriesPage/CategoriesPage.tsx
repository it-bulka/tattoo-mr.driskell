import cls from './CategoriesPage.module.scss'
import classNames from 'classnames'
import { Breadcrumbs, ErrorMsg } from '@/shared/ui'
import { TopLoader } from '@/shared/ui/Loaders'
import { FilterToolbar } from '@/widgets'
import { ResetFilters } from '@/features'
import { useTranslation } from 'react-i18next'
import { ProductListWithBtn } from '@/entities/ProductList/ProductListWithBtn'
import { useGetProductsPaginatedQuery } from '@/entities/ProductList'
import { ProductCategory } from '@/entities/ProductList'
import { useParams } from 'react-router'
import { useState, useCallback } from 'react'
import { useProductFilters } from '@/widgets/FilterToolbar/model/useProductFilters'
import { CategoriesProductsLoader } from './CategoriesProductsLoader'

const LIMIT = 20

const CategoriesPage = () => {
  const { t } = useTranslation()
  const { slug } = useParams<{ slug: string }>()

  const normalizedSlug = slug?.toLowerCase().replace(/[,\s]+/g, '-')
  const isNewArrivals = normalizedSlug === 'new-arrivals'

  const { filterState, handlers, apiParams, isFiltersActive } = useProductFilters()

  const [prevSlug, setPrevSlug] = useState(normalizedSlug)
  const [page, setPage] = useState(1)

  if (normalizedSlug !== prevSlug) {
    setPrevSlug(normalizedSlug)
    setPage(1)
  }

  const { data, isFetching, isError } = useGetProductsPaginatedQuery({
    page,
    limit: LIMIT,
    ...(isNewArrivals
      ? { label: 'new' as const }
      : { category: normalizedSlug as ProductCategory }),
    ...apiParams,
  })

  const handleLoadMore = useCallback(() => {
    if (data && page < data.totalPages) {
      setPage(p => p + 1)
    }
  }, [data, page])

  const handleReset = useCallback(() => {
    setPage(1)
    handlers.handleReset()
  }, [handlers])

  const wrappedHandlers = {
    ...handlers,
    handleTagsChange: (tags: typeof filterState.tags) => {
      setPage(1)
      handlers.handleTagsChange(tags)
    },
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
    handleMotorTypesChange: (motorTypes: typeof filterState.motorTypes) => {
      setPage(1)
      handlers.handleMotorTypesChange(motorTypes)
    },
    handleNeedleTypesChange: (needleTypes: typeof filterState.needleTypes) => {
      setPage(1)
      handlers.handleNeedleTypesChange(needleTypes)
    },
  }

  return (
    <div className={cls.pageWrapper}>
      <TopLoader isLoading={isFetching && !!data} />
      <div className={classNames(cls.categoriesPage, 'container')}>
        <Breadcrumbs />
        <h3 className={classNames('pageTitle', cls.title)}>
          {slug ? t(slug.replace(/-/g, ' ')) : t('tattoo machines')}
        </h3>
        <FilterToolbar
          className={cls.filterToolbar}
          category={isNewArrivals ? undefined : normalizedSlug as ProductCategory}
          filterState={filterState}
          handlers={wrappedHandlers}
        />

        <ResetFilters
          className={cls.resetFilters}
          disabled={!isFiltersActive}
          onReset={handleReset}
        />

        {isFetching && !data && <CategoriesProductsLoader />}
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
    </div>
  )
}

export default CategoriesPage
