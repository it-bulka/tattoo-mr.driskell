import { rtkApi } from '@/shared/api/rtkApi.ts'

interface LikedProps {
  machineId: string
  userId: string
}

const likesApi = rtkApi.injectEndpoints({
  endpoints: (build) =>  ({
    addLike: build.mutation<void, LikedProps>({
      query: ({ machineId, userId }) => ({
        url: `/favourites/${machineId}`,
        method: 'POST',
        body: { userId }
      })
   }),
    deleteLike: build.mutation<void, LikedProps>({
      query: ({ machineId, userId }) => ({
        url: `/favourites/${machineId}`,
        method: 'DELETE',
        body: { machineId, userId }
      })
    })
  })
})

export const { useAddLikeMutation, useDeleteLikeMutation } = likesApi