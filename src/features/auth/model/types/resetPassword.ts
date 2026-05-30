import z from 'zod'
import { passwordField, passwordsMatchRefinement } from './validators.ts'

export const getResetPasswordSchema = () =>
  z.object({
    password: passwordField(),
    confirmPassword: z.string()
  })
  .refine(
    passwordsMatchRefinement().refine,
    {
      message: passwordsMatchRefinement().message,
      path: passwordsMatchRefinement().path,
    })

export type ResetPasswordFormData = z.infer<ReturnType<typeof getResetPasswordSchema>>

export type ResetPasswordReq = {
  email: string
  token: string
  password: string
}

