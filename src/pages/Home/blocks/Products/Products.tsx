import cls from '../../Home.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Button, Tabs } from '@/shared/ui'
import { ProductList, ProductsSlider, getProductsByKey, productsActions } from '@/entities'
import { useDevice } from '@/shared/libs'
import { useGetProductsQuery } from './model/api/productsApi.ts'
import { memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/app/providers/StoreProvider/config/store.ts'
import { useLoadMore } from './utils/useLoadMoreProducts.tsx'
import { ProductCategory } from '@/entities'
import { useTabClick } from './utils/useTabClick.tsx'
import { Product } from '@/entities/ProductCard/ProductCard.tsx'

interface ProductsProps {
  className?: string
}

const productsTabs: { id: ProductCategory, name: string }[] = [
  {id: 'bestseller', name: 'Bestsellers'},
  {id: 'popular', name: 'Most Popular'},
  {id: 'new', name: 'New Arrivals'},
  {id: 'sale', name: 'On Sale'},
]

const listKey = 'home-page'

interface IProductView {
  products: Product[]
  showSeeMoreBtn: boolean
  isFetching: boolean
  handleLoadMore: () => void
}
const ProductView = ({
  products,
  showSeeMoreBtn,
  isFetching,
  handleLoadMore
}: IProductView) => {
  const isMobile = useDevice(1200)
  const { t } = useTranslation()

  return isMobile
    ? <ProductsSlider list={products} sliderId={'products'} />
    : (
      <>
        <ProductList products={products} />
        {showSeeMoreBtn || (
          <Button big className={cls.seeMore} disabled={isFetching} onClick={handleLoadMore}>
            {isFetching ? t('loading') : t('see more')}
          </Button>
        )}
      </>
    )
}

export const Products = memo(({ className }: ProductsProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const productsState = useSelector(getProductsByKey(listKey))
  const { products, currentPage, totalPages } = productsState

  const { data, isFetching } = useGetProductsQuery(
    { page: currentPage, limit: 10, category:  productsState.category},
    { skip: currentPage === 1 && products.length > 0 && productsState.category === undefined }
  )

  const handleLoadMore = useLoadMore({
    key: listKey,
    currentPage,
    totalPages
  })

  const handleTabClick = useTabClick({ key: listKey })

  useEffect(() => {
    if (data) {
      dispatch(productsActions.setProducts({ key: listKey, products: data.machines, replace: currentPage === 1 }))
      dispatch(productsActions.setTotalPages({ key: listKey, totalPages: data.totalPages }))
    }
  }, [data, dispatch])


  if (!data) {
    return null
  }

  return (
    <div className={classNames('', 'container', {}, [className])}>
      <Tabs className={cls.tabs} tabs={productsTabs} justify="between" onClick={handleTabClick}/>
      {products?.length
        ? (
          <ProductView
            isFetching={isFetching}
            handleLoadMore={handleLoadMore}
            products={products}
            showSeeMoreBtn={currentPage < totalPages}
          />
        ) : <p>{t('machines not found')}</p>
      }
    </div>
  )
})

Products.displayName = 'Products'