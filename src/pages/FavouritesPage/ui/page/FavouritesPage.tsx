import { ProductListWithBtn } from '@/entities'
import { ErrorMsg, GoHomeButton } from '@/shared/ui'
import { useTranslation } from 'react-i18next'
import cls from './FavouritesPage.module.scss'
import { useGetLikedProducts } from '../../utils/useGetLikedProducts/useGetLikedProducts.tsx'
import {
  useInitFavouritesFullData
} from '../../utils/useInitFavouritesFullData/useInitFavouritesFullData.tsx';

const FavouritesPage = () => {
  useInitFavouritesFullData()

  const { t } = useTranslation('favourites')
  const {
    data, error, handleLoadMore, canLoadMore, isFetching
  } = useGetLikedProducts()

  return (
    <div className="container pageSpacing">
      <p className="pageTitle">{t('liked items')}</p>
      <p className={cls.foundedAmount}>{t('founded liked items', { count: data.length || 0 })}</p>
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