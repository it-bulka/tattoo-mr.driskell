import z from 'zod'
import i18n from '@/shared/config/i18n/i18n.tsx'

export const i18nOptions = { ns: "auth"}

export const emailField = () =>
  z.string().email(i18n.t('validation.email.invalid', i18nOptions))

export const agreeField = () => {
  console.log("SEE: i18n", i18n.language, i18n.hasResourceBundle('uk', 'auth'), i18n.t('validation.email.invalid', { ns: 'auth' }))
  return z.boolean().refine(Boolean, {
    message: i18n.t('validation.agree.required')
  })
}

export const passwordField = () =>
  z.string()
    .min(6, i18n.t('validation.password.min', i18nOptions))
    .regex(/[a-z]/, i18n.t('validation.password.smallLetter', i18nOptions))
    .regex(/[A-Z]/, i18n.t('validation.password.bigLetter', i18nOptions))
    .regex(/\d/, i18n.t('validation.password.digit'))
    .regex(/[^a-zA-Z0-9]/, i18n.t('validation.password.character', i18nOptions))

export const getEmailAndPasswordSchema = () =>
  z.object({
    email: emailField(),
    password: passwordField()
  })

export const passwordsMatchRefinement = () => ({
  message: i18n.t('validation.password.confirm', i18nOptions),
  path: ['confirmPassword'],
  refine: (data: { password: string; confirmPassword: string }) =>
    data.password === data.confirmPassword,
})