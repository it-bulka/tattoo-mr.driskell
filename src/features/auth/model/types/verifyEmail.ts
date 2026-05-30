import z from 'zod'
import { emailField } from './validators.ts'

export const getVerifyEmailSchema = () =>
  z.object({
    email: emailField()
  })

export type VerifyEmailFormData = z.infer<ReturnType<typeof getVerifyEmailSchema>>

export type VerifyEmailReq = {
  email: string | null
  verificationToken: string | null
}