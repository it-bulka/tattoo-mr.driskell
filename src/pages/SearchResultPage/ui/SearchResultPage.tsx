import { ProductList } from '@/entities'
import { ErrorMsg } from '@/shared/ui'
import { getRtkApiMessage } from '@/shared/libs'
import { useTranslation } from 'react-i18next'
import {
  useGetCachedSearchProducts
} from '../utils/useGetCachedSearchProducts/useGetCachedSearchProducts.tsx'

const SearchResultPage = () => {
  const { t } = useTranslation('search-result')
  const { data, isFetching, isError, error } = useGetCachedSearchProducts()

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
      {t('founded', { count: data?.data?.length ?? 0})}
      {!data?.data?.length || <ProductList products={data.data}/>}
      {(isError && error) && <ErrorMsg as="p" text={getRtkApiMessage(error)} />}
    </div>
  )
}

export default SearchResultPage