import { rtkApi } from '@/shared/api/rtkApi.ts'
import { User } from '../type/userSchema.tsx'

interface UpdateUserArg {
  id: string
  body: {
    name?: string
    email?: string
    phone?: string
    city?: string
    street?: string
    apartment?: string
    entrance?: string
    floor?: string
    doorphone?: string
  }
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
    updatePassword: build.mutation<void, { id: string; body: { oldPassword: string; newPassword: string } }>({
      query: ({ id, body }) => ({
        url: `/users/${id}/update-password`,
        method: 'PATCH',
        body,
      }),
    }),
    deleteUser: build.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useGetUserQuery, useUpdateUserMutation, useUpdatePasswordMutation, useDeleteUserMutation } = userApi
