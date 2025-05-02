import { rtkApi } from '@/shared/api/rtkApi.ts'
import { Product } from '@/entities/ProductCard/ProductCard.tsx'

type Res<T> = {
  data: T
  success: boolean
}

type FavouritesData = Res<{
  items: Product[]
  totalCount: number
  totalPages: number
  currentPage: number
}>

type FavouritesIdsRes = Res<string[]>

interface BatchingFavoritesArg {
  userId: string
  idsToAdd: string[]
  idsToRemove: string[]
}

type BatchFavouriteRes = Res<{
  added: string[],
  removed: string[],
}> & {
  error?: {
    added: string[],
    removed: string[],
    message: string
  }
}

interface GetFavouritesArg {
  userId: string
  page?: number
  limit?: number
}

export const favouriteApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    getFavourites: build.mutation<FavouritesData, GetFavouritesArg>({
      query: ({ userId, page = 1, limit = 10 }) => ({
        url: '/favourites',
        method: 'POST',
        body: { userId, page, limit }
      })
    }),
    getAllFavouritesIds: build.mutation<FavouritesIdsRes, string>({
      query: (userId) => ({
        url: '/favourites/ids',
        method: 'POST',
        body: { userId }
      })
    }),
    deleteFavourite: build.mutation<void, { userId: string, productId: string }>({
      query: ({ userId, productId }) => ({
        url:`/favourites/${productId}`,
        method: 'DELETE',
        body: { userId }
      })
    }),
    batchFavourite: build.mutation<BatchFavouriteRes, BatchingFavoritesArg>({
      query: ({ userId, idsToAdd, idsToRemove }) => ({
        url:`/favourites/batching`,
        method: 'POST',
        body: { userId, idsToAdd, idsToRemove }
      })
    })
  })
})

export const {
  useGetAllFavouritesIdsMutation,
  useGetFavouritesMutation
} = favouriteApi
