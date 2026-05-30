import { z } from 'zod'
import i18n from '@/shared/config/i18n/i18n.tsx'

export const FormSchema = z.object({
  name: z.string().min(2, i18n.t('validation.enter_name')),
  phone: z.string().min(10, i18n.t('validation.enter_phone')),
  email: z.string().email(i18n.t('validation.invalid_email')),
  city: z.string().min(2, i18n.t('validation.enter_city')),
  street: z.string().min(2, i18n.t('validation.enter_street')),
  apartment: z.string().optional(),
  entrance: z.string().optional(),
  floor: z.string().optional(),
  entryphone: z.string().optional(),
  agree: z.boolean().refine(Boolean, {
    message: i18n.t('validation.agree_required'),
  })
})

export type FormData = z.infer<typeof FormSchema>

export type FieldConfig<K extends keyof FormData> = {
  name: K
  label: string
  placeholder: string
}
