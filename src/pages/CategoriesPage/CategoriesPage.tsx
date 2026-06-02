import cls from './CategoriesPage.module.scss'
import classNames from 'classnames'
import { Breadcrumbs, ErrorMsg } from '@/shared/ui'
import { FilterToolbar } from '@/widgets'
import { useTranslation } from 'react-i18next'
import { ProductListWithBtn } from '@/entities'
import { useGetProductsPaginatedQuery } from '@/entities/ProductList'
import { ProductCategory } from '@/entities/ProductList'
import { useParams } from 'react-router'
import { useState, useCallback } from 'react'
import { LoaderCircle } from '@/shared/ui/Loaders'

const LIMIT = 20

const CategoriesPage = () => {
  const { t } = useTranslation()
  const { slug } = useParams<{ slug: string }>()

  const normalizedSlug = slug?.toLowerCase().replace(/[,\s]+/g, '-') as ProductCategory

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
  })

  const handleLoadMore = useCallback(() => {
    if (data && page < data.totalPages) {
      setPage(p => p + 1)
    }
  }, [data, page])

  return (
    <div className={classNames(cls.categoriesPage, 'container')}>
      <Breadcrumbs />
      <h3 className={classNames('pageTitle', cls.title)}>
        {slug ? t(slug) : t('tattoo machines')}
      </h3>
      <FilterToolbar className={cls.filterToolbar} />

      {isFetching && !data && <LoaderCircle />}
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
