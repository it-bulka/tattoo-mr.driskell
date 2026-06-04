import { ProductList } from '@/entities/ProductList/ProductList'
import { ErrorMsg } from '@/shared/ui'
import { getRtkApiMessage, useSeoMeta } from '@/shared/libs'
import { useTranslation } from 'react-i18next'
import {
  useGetCachedSearchProducts
} from '../utils/useGetCachedSearchProducts/useGetCachedSearchProducts.tsx'
import { useSelector } from 'react-redux'
import { getSearchValueSelectors } from '@/features/searchTattooMachine'

const SearchResultPage = () => {
  const { t } = useTranslation('search-result')
  const { data, isFetching, isError, error } = useGetCachedSearchProducts()
  const searchQuery = useSelector(getSearchValueSelectors)

  // TODO: add loader
  if (isFetching) {
    return (
      <div className="container pageSpacing">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="container pageSpacing">
      {useSeoMeta({
        title: searchQuery ? `Пошук: ${searchQuery}` : 'Пошук',
        noIndex: true,
      })}
      {t('founded', { count: data?.data?.length ?? 0})}
      {!data?.data?.length || <ProductList products={data.data}/>}
      {(isError && error) && <ErrorMsg as="p" text={getRtkApiMessage(error)} />}
    </div>
  )
}

export default SearchResultPage