export { ResetPasswordModal } from './resetPassword/ui/ResetPasswordModal.tsx'
export { VerifyEmailModal } from './verifyEmail/ui/VerifyEmailModal.tsx'

export type { AuthSchema } from './model/types/AuthSchema.ts'
export { authReducer, authActions } from '@/features/auth/model/slice/authSlice.ts'
export { getIsAuth } from './model/selectors/getIsAuth.ts'