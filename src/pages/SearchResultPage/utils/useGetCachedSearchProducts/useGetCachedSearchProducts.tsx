import { useSelector } from 'react-redux'
import { getSearchValueSelectors } from '@/features/searchTattooMachine'
import { useGetSearchedProductsQuery } from '@/features'

export const useGetCachedSearchProducts = () => {
  const searchValue = useSelector(getSearchValueSelectors)

  const res = useGetSearchedProductsQuery({ search: searchValue }, {
    refetchOnMountOrArgChange: false,
    selectFromResult: (result) => result,
  })

  return res
}