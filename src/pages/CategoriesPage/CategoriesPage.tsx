import cls from './CategoriesPage.module.scss'
import classNames from 'classnames'
import { Breadcrumbs, ErrorMsg } from '@/shared/ui'
import { FilterToolbar } from '@/widgets'
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

  const normalizedSlug = slug?.toLowerCase().replace(/[,\s]+/g, '-') as ProductCategory

  const { filterState, handlers, apiParams } = useProductFilters()

  const [prevSlug, setPrevSlug] = useState(normalizedSlug)
  const [page, setPage] = useState(1)

  if (normalizedSlug !== prevSlug) {
    setPrevSlug(normalizedSlug)
    setPage(1)
  }

  const { data, isFetching, isError } = useGetProductsPaginatedQuery({
    page,
    limit: LIMIT,
    category: normalizedSlug,
    ...apiParams,
  })

  const handleLoadMore = useCallback(() => {
    if (data && page < data.totalPages) {
      setPage(p => p + 1)
    }
  }, [data, page])

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
    <div className={classNames(cls.categoriesPage, 'container')}>
      <Breadcrumbs />
      <h3 className={classNames('pageTitle', cls.title)}>
        {slug ? t(slug) : t('tattoo machines')}
      </h3>
      <FilterToolbar
        className={cls.filterToolbar}
        category={normalizedSlug}
        filterState={filterState}
        handlers={wrappedHandlers}
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
  )
}

export default CategoriesPage
