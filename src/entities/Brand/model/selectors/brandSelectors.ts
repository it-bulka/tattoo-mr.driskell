import { createSelector } from '@reduxjs/toolkit'
import { brandsApi } from '../api/brandsApi.ts'
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts'
import i18n from '@/shared/config/i18n/i18n.tsx'

export const makeSelectBrandBySlug = (slug: string) =>
  createSelector(
    (state: StateSchema) => brandsApi.endpoints.getBrands.select(i18n.language)(state),
    (result) => result.data?.find(b => b.slug === slug)
  )
