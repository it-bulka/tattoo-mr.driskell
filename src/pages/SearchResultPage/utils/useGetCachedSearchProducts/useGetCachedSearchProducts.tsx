import { useSelector } from 'react-redux'
import { getSearchValueSelectors } from '@/features/searchTattooMachine'
import { useGetSearchedProductsQuery } from '@/features'
import { useTranslation } from 'react-i18next'

export const useGetCachedSearchProducts = () => {
  const searchValue = useSelector(getSearchValueSelectors)
  const { i18n } = useTranslation()

  const res = useGetSearchedProductsQuery(
    { search: searchValue, lang: i18n.language },
    {
      refetchOnMountOrArgChange: false,
      selectFromResult: (result) => result,
    }
  )

  return res
}
