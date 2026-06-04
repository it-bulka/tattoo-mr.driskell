import { ProductListWithBtn } from '@/entities/ProductList/ProductListWithBtn';
import { ErrorMsg } from '@/shared/ui';
import { GoHomeButton } from '@/shared/ui/GoHomeButton/GoHomeButton'
import { useTranslation } from 'react-i18next'
import cls from './FavouritesPage.module.scss'
import { useGetLikedProducts } from '../../utils/useGetLikedProducts/useGetLikedProducts.tsx'
import {
  useInitFavouritesFullData
} from '../../utils/useInitFavouritesFullData/useInitFavouritesFullData.tsx'
import { useSeoMeta } from '@/shared/libs'

const FavouritesPage = () => {
  useInitFavouritesFullData()

  const { t } = useTranslation('favourites')
  const {
    data, error, handleLoadMore, canLoadMore, isFetching, totalAmount
  } = useGetLikedProducts()

  return (
    <div className="container pageSpacing">
      {useSeoMeta({ title: 'Обрані товари', noIndex: true })}
      <p className="pageTitle">{t('liked items')}</p>
      <p className={cls.foundedAmount}>{t('founded liked items', { count: totalAmount || 0 })}</p>
      {error && <ErrorMsg text={error}/>}
      {
        (!error && !data.length)
          ? (
            <>
              <ErrorMsg text={t('no favourite yet')} type="info"/>
              <GoHomeButton className={cls.btn}/>
            </>
          )
          : (
            <>
              <ProductListWithBtn
                products={data}
                onLoadMoreClick={handleLoadMore}
                isLoading={isFetching}
                showSeeMoreBtn={canLoadMore}
              />
            </>
          )
      }
    </div>
  )
}

export default FavouritesPage