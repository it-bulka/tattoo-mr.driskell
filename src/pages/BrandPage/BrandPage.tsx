import cls from './BrandPage.module.scss'
import classNames from 'classnames'
import { Breadcrumbs, FilterButton, ErrorMsg } from '@/shared/ui'
import { useTranslation } from 'react-i18next'
import { ProductListWithBtn } from '@/entities/ProductList/ProductListWithBtn'
import { useGetProductsPaginatedQuery } from '@/entities/ProductList'
import { ProductCategory } from '@/entities/ProductList'
import { FilterToolbar } from '@/widgets'
import { useProductFilters } from '@/widgets/FilterToolbar/model/useProductFilters'
import { memo, useState, useCallback } from 'react'
import { useParams } from 'react-router'
import { useGetBrandsQuery } from '@/entities/Brand'
import { BrandProductsLoader } from './BrandProductsLoader'
import { useSeoMeta } from '@/shared/libs'

const LIMIT = 20

const CATEGORY_TABS: Array<{ value: ProductCategory; labelKey: string }> = [
  { value: 'tattoo-machines',                   labelKey: 'tattoo machines' },
  { value: 'tattoo-sets',                        labelKey: 'tattoo sets' },
  { value: 'tattoo-inks',                        labelKey: 'tattoo inks' },
  { value: 'tattoo-needles',                     labelKey: 'tattoo needles' },
  { value: 'tattoo-holders',                     labelKey: 'tattoo holders' },
  { value: 'tattoo-tips',                        labelKey: 'tattoo tips' },
  { value: 'power-supplies',                     labelKey: 'power supplies' },
  { value: 'pedals-and-wires',                   labelKey: 'pedals and wires' },
  { value: 'accessories',                        labelKey: 'accessories' },
  { value: 'printers-and-tablets',               labelKey: 'printers and tablets' },
  { value: 'protection-containers-consumables',  labelKey: 'protection, containers, consumables' },
]

const BrandPage = memo(() => {
  const { t, i18n } = useTranslation()
  const { slug } = useParams<{ slug: string }>()
  const { data: brands = [] } = useGetBrandsQuery(i18n.language)
  const brand = brands.find(b => b.slug === slug)

  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>([])
  const [page, setPage] = useState(1)
  const { filterState, handlers, apiParams } = useProductFilters()

  const handleCategoryToggle = useCallback((category: ProductCategory) => {
    setSelectedCategories(prev => {
      const next = prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
      return next
    })
    setPage(1)
  }, [])

  const { data, isFetching, isError } = useGetProductsPaginatedQuery({
    page,
    limit: LIMIT,
    brandSlug: slug,
    ...(selectedCategories.length ? { category: selectedCategories } : {}),
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

  const activeCategory = selectedCategories.length === 1 ? selectedCategories[0] : undefined

  return (
    <div className={classNames(cls.brandsPage, 'container')}>
      {useSeoMeta({
        title: brand ? `${brand.name} — тату-машинки` : (slug ?? 'Бренд'),
        description: brand
          ? `Тату-машинки бренду ${brand.name}. Офіційний імпортер, гарантія якості.`
          : undefined,
        ogImage: brand?.imgUrl,
      })}
      <Breadcrumbs />
      <div className={cls.brand}>
        {brand?.imgUrl && <img src={brand.imgUrl} alt={brand.name} loading="lazy" decoding="async" />}
        <h1 className="pageTitle">{brand?.name ?? slug}</h1>
      </div>

      <div className={cls.filters}>
        {CATEGORY_TABS.map(({ value, labelKey }) => (
          <FilterButton
            key={value}
            isActive={selectedCategories.includes(value)}
            onClick={() => handleCategoryToggle(value)}
          >
            {t(labelKey)}
          </FilterButton>
        ))}
      </div>

      <FilterToolbar
        className={cls.filterToolbar}
        category={activeCategory}
        filterState={filterState}
        handlers={wrappedHandlers}
      />

      {isFetching && !data && <BrandProductsLoader />}
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
})

BrandPage.displayName = 'BrandPage'

export default BrandPage
