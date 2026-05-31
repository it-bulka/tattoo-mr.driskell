import { rtkApi } from '@/shared/api/rtkApi.ts'
import { User } from '../type/userSchema.tsx'

interface UpdateUserArg {
  id: string
  body: { name?: string; email?: string }
}

export const userApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    getUser: build.query<User, string>({
      query: (id) => `/users/${id}`,
      transformResponse: (res: { data: User }) => res.data,
      providesTags: (_, __, id) => [{ type: 'User' as const, id }],
    }),
    updateUser: build.mutation<User, UpdateUserArg>({
      query: ({ id, body }) => ({
        url: `/users/${id}/update`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (res: { data: User }) => res.data,
      invalidatesTags: (_, __, { id }) => [{ type: 'User' as const, id }],
    }),
  }),
})

export const { useGetUserQuery, useUpdateUserMutation } = userApi
