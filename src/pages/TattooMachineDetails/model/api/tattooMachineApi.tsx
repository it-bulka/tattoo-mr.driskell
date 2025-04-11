import { rtkApi } from '@/shared/api/rtkApi.ts'
import { ProductExtended } from '@/shared/type/tattoo-machine.ts'
import { Product } from '@/entities/ProductCard/ProductCard.tsx'


interface RelatedProducts {
  combo: Product[]
  recommended: Product[]
  brands: Product[]
  similar: Product[]
}

const tattooMachineApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    getTattooMachine: build.query<ProductExtended, {id: string}>({
      query: ({ id }) => {
        return {
          url: `/tattoo-machines/${id}`
        }
      },
    }),
    getRelatedTattooMachine: build.query<RelatedProducts, {id: string}>({
      query: ({ id }) => {
        return {
          url: `/tattoo-machines/${id}/related`
        }
      },
    })
  })
})

export const { useGetTattooMachineQuery, useGetRelatedTattooMachineQuery } = tattooMachineApi