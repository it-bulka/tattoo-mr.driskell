import { rtkApi } from '@/shared/api/rtkApi.ts'
import { RegistrationFormData } from '../types/registration.ts'
import { LoginFormData, LoginRes } from '../types/login.ts'
import { VerifyEmailReq } from '../types/verifyEmail.ts'
import { ResetPasswordReq } from '../types/resetPassword.ts'

export const auth = rtkApi.injectEndpoints({
  endpoints: build => ({
    sendForgotPasswordEmail: build.mutation({
      query: ({ email }) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: { email }
      })
    }),
    register: build.mutation<void, RegistrationFormData>({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data
      })
    }),
    login: build.mutation<LoginRes, LoginFormData>({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data
      })
    }),
    verifyEmail: build.mutation<LoginRes, VerifyEmailReq>({
      query: (data) => ({
        url: '/auth/verify-email',
        method: 'POST',
        body: data
      })
    }),
    resetPassword: build.mutation<void, ResetPasswordReq>({
      query: (data) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: data
      })
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST'
      })
    })
  })
})

export const {
  useSendForgotPasswordEmailMutation,
  useRegisterMutation,
  useLogoutMutation,
  useResetPasswordMutation,
} = auth