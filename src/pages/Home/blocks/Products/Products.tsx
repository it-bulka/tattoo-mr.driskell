import cls from '../../Home.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Tabs } from '@/shared/ui'
import {
  ProductsSlider, getAllProducts, productsActions, ProductListWithBtn, PRODUCT_PAGES
} from '@/entities'
import { useDevice } from '@/shared/libs'
import { useLazyGetProductsQuery } from './model/api/productsApi.ts'
import { memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/app/providers/StoreProvider/config/store.ts'
import { useLoadMore } from './utils/useLoadMoreProducts.tsx'
import { ProductCategory } from '@/entities'
import { useTabClick } from './utils/useTabClick.tsx'
import { Product } from '@/entities/ProductCard/ProductCard.tsx'
import { useInitialParams } from './utils/useInitialParams/useInitialParams.tsx'
import { useState } from 'react'

interface ProductsProps {
  className?: string
}

const productsTabs: { id: ProductCategory, name: string }[] = [
  {id: 'bestseller', name: 'Bestsellers'},
  {id: 'popular', name: 'Most Popular'},
  {id: 'new', name: 'New Arrivals'},
  {id: 'sale', name: 'On Sale'},
]

const listKey = PRODUCT_PAGES.HOME

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

  return isMobile
    ? <ProductsSlider list={products} sliderId={'products'} />
    : (
      <ProductListWithBtn
        btnClass={cls.seeMore}
        products={products}
        onLoadMoreClick={handleLoadMore}
        isLoading={isFetching}
        showSeeMoreBtn={showSeeMoreBtn}
      />
    )
}

export const Products = memo(({ className }: ProductsProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const productsState = useSelector(getAllProducts(listKey))
  const { products, currentPage, totalPages } = productsState
  const initParams = useInitialParams()
  const [isReady, setIsReady] = useState(false)

  const [trigger, { data, isFetching }] = useLazyGetProductsQuery()

  const handleLoadMore = useLoadMore({
    key: listKey,
    currentPage,
    totalPages
  })

  const handleTabClick = useTabClick({ key: listKey })

  useEffect(() => {
    if (initParams) {
      console.log('initParams', initParams)
      dispatch(productsActions.setPage({ key: listKey, page: initParams.page ? Number(initParams.page) : 1 }));
      dispatch(productsActions.setCategory({ key: listKey, category: initParams.category as ProductCategory }));
      setIsReady(true);
    }
  }, [initParams])

  useEffect(() => {
    if (isReady) {
      trigger({
        page: currentPage,
        limit: 10,
        category: productsState.category
      })
    }
  }, [isReady, currentPage, productsState.category])

  useEffect(() => {
    if (data) {
      dispatch(productsActions.setProducts({ key: listKey, products: data.machines, replace: currentPage === 1 }))
      dispatch(productsActions.setTotalPages({ key: listKey, totalPages: data.totalPages }))
    }
  }, [data, dispatch])


  if (!data && !products) {
    return null
  }

  return (
    <div className={classNames('', 'container', {}, [className])}>
      <Tabs
        className={cls.tabs}
        tabs={productsTabs}
        initialActiveTabId={initParams.category as ProductCategory}
        justify="between"
        onClick={handleTabClick}/>
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