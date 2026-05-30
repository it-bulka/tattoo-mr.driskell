import { agreeField, getEmailAndPasswordSchema } from './validators.ts'
import z from 'zod'
import { User } from '@/entities'

export const getLoginSchema = () =>
  getEmailAndPasswordSchema()
    .extend({
      agree: agreeField()
    })

export type LoginFormData = z.infer<ReturnType<typeof getLoginSchema>>

export type LoginRes = {
  data: User
  accessToken: string
  success: boolean
}