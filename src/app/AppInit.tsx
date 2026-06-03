import { useTranslation } from 'react-i18next'
import { useGetBrandsQuery } from '@/entities/Brand'

const AppInit = () => {
  const { i18n } = useTranslation()
  useGetBrandsQuery(i18n.language)
  return null
}

export default AppInit
