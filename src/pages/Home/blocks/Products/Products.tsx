import cls from '../../Home.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Tabs, ErrorMsg } from '@/shared/ui'
import { ProductListWithBtn } from '@/entities/ProductList/ProductListWithBtn'
import { useDevice } from '@/shared/libs'
import { lazy, Suspense } from 'react'

const ProductsSlider = lazy(() =>
  import('@/entities/ProductsSlider/ProductsSlider').then(m => ({ default: m.ProductsSlider }))
)
import { useLazyGetProductsQuery } from '@/entities/ProductList'
import { memo, useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'react-router'
import { ProductLabel } from '@/entities/ProductList'
import { Product } from '@/entities/ProductCard/ProductCard.tsx'
import { useInitialParams } from './utils/useInitialParams/useInitialParams.tsx'
import { ProductsLoader } from './ProductsLoader'
import { ProductsSliderSkeleton } from '@/entities/ProductsSlider/ProductsSliderSkeleton'

const LIMIT = 10

const productsTabs: { id: ProductLabel; name: string }[] = [
  { id: 'bestseller', name: 'Bestsellers' },
  { id: 'popular', name: 'Most Popular' },
  { id: 'new', name: 'New Arrivals' },
  { id: 'sale', name: 'On Sale' },
]

interface ProductsProps {
  className?: string
}

export const Products = memo(({ className }: ProductsProps) => {
  const { t } = useTranslation()
  const [, setSearchParams] = useSearchParams()
  const initParams = useInitialParams()
  const isMobile = useDevice(1200)

  const [products, setProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(Number(initParams.page) || 1)
  const [label, setLabel] = useState<ProductLabel>(
    (initParams.category as ProductLabel) || 'bestseller'
  )
  const [totalPages, setTotalPages] = useState(1)

  const [trigger, { isFetching, isError }] = useLazyGetProductsQuery()

  useEffect(() => {
    trigger({ page: currentPage, limit: LIMIT, label })
      .unwrap()
      .then(data => {
        setProducts(prev => currentPage === 1 ? data.machines : [...prev, ...data.machines])
        setTotalPages(data.totalPages)
      })
      .catch(() => {})
  }, [currentPage, label])

  const handleLoadMore = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(p => p + 1)
    }
  }, [currentPage, totalPages])

  const handleTabClick = useCallback((tab: { id: ProductLabel }) => {
    setLabel(tab.id)
    setCurrentPage(1)
    setSearchParams({ category: tab.id })
  }, [setSearchParams])

  return (
    <div className={classNames('', 'container', {}, [className])}>
      <Tabs
        className={cls.tabs}
        tabs={productsTabs}
        initialActiveTabId={label}
        justify="between"
        onClick={handleTabClick}
      />
      {isFetching && products.length === 0 && (
        isMobile ? <ProductsSliderSkeleton /> : <ProductsLoader />
      )}
      {isError && <ErrorMsg as="p" text={t('Failed to load products')} size="medium" />}
      {!isError && products.length > 0 && (
        isMobile
          ? (
            <Suspense fallback={<ProductsSliderSkeleton />}>
              <ProductsSlider list={products} sliderId="products" />
            </Suspense>
          )
          : (
            <ProductListWithBtn
              btnClass={cls.seeMore}
              products={products}
              onLoadMoreClick={handleLoadMore}
              isLoading={isFetching}
              showSeeMoreBtn={currentPage < totalPages}
            />
          )
      )}
      {!isError && !products.length && !isFetching && (
        <p>{t('machines not found')}</p>
      )}
    </div>
  )
})

Products.displayName = 'Products'
