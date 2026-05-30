import z from 'zod'
import { emailField } from './validators.ts'

export const getForgotPasswordSchema = () =>
  z.object({
    email: emailField()
  })


export type ForgotPasswordFormData = z.infer<ReturnType<typeof getForgotPasswordSchema>>