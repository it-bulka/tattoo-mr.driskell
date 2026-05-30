import z from 'zod'
import {
  agreeField,
  getEmailAndPasswordSchema,
  passwordsMatchRefinement,
  i18nOptions
} from './validators.ts'
import i18n from '@/shared/config/i18n/i18n.tsx'

export const getRegistrationSchema = () =>
  getEmailAndPasswordSchema()
    .extend({
      name: z
        .string()
        .min(3, i18n.t('validation.name.min', i18nOptions))
        .max(50, i18n.t('validation.name.max', i18nOptions)),
      confirmPassword: z.string(),
      agree: agreeField()
    })
    .refine(
      passwordsMatchRefinement().refine,
      {
        message: passwordsMatchRefinement().message,
        path: passwordsMatchRefinement().path,
      })

export type RegistrationFormData = z.infer<ReturnType<typeof getRegistrationSchema>>