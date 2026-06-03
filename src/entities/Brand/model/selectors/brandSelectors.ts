import { brandsApi } from '../api/brandsApi.ts'
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts'
import i18n from '@/shared/config/i18n/i18n.tsx'

export const selectBrandBySlug = (slug: string) => (state: StateSchema) => {
  const result = brandsApi.endpoints.getBrands.select(i18n.language)(state)
  return result.data?.find(b => b.slug === slug)
}
