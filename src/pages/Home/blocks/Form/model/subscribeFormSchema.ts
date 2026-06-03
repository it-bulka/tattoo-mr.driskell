import { z } from 'zod'
import i18n from '@/shared/config/i18n/i18n.tsx'

export const getSubscribeFormSchema = () => z.object({
  email: z.string().email(i18n.t('validation.invalid_email')),
  name: z.string().min(2, i18n.t('validation.enter_name')),
  agree: z.boolean().refine(Boolean, { message: i18n.t('validation.agree_required') }),
})

export type SubscribeFormData = z.infer<ReturnType<typeof getSubscribeFormSchema>>
