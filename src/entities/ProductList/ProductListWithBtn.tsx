import { ProductList } from '@/entities'
import { Button } from '@/shared/ui'
import { type Product } from '@/entities/ProductCard/ProductCard.tsx'
import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import classNames from 'classnames'
import cls from './ProductsList.module.scss'

interface ProductListWithBtnProps {
  productListClass?: string
  btnClass?: string
  products: Product[]
  isLoading?: boolean
  showSeeMoreBtn?: boolean
  onLoadMoreClick: () => void
}

export const ProductListWithBtn = memo(({
  productListClass,
  btnClass,
  products,
  isLoading = false,
  showSeeMoreBtn = true,
  onLoadMoreClick
}: ProductListWithBtnProps) => {
  const { t } = useTranslation()

  return (
    <>
      <ProductList products={products} className={productListClass}/>
      {showSeeMoreBtn ? (
        <Button
          big
          center
          className={classNames(cls.btn, btnClass)}
          disabled={isLoading}
          onClick={onLoadMoreClick}
        >
          {isLoading ? t('loading') : t('see more')}
        </Button>
      ) : null}
    </>
  )
})

ProductListWithBtn.displayName = 'ProductListWithBtn'