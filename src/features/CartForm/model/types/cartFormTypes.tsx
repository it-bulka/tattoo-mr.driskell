import { z } from 'zod'
import i18n from '@/shared/config/i18n/i18n.tsx'

export const getCartFormSchema = () => z.object({
  name: z.string().min(2, i18n.t('validation.enter_name')),
  phone: z.string().min(10, i18n.t('validation.enter_phone')),
  email: z.string().email(i18n.t('validation.invalid_email')),

  deliveryMethod: z.enum(['courier', 'novaPoshta']),

  // Courier-only address fields
  city: z.string().optional(),
  street: z.string().optional(),
  apartment: z.string().optional(),
  entrance: z.string().optional(),
  floor: z.string().optional(),
  doorphone: z.string().optional(),
  comment: z.string().optional(),

  // Nova Poshta fields
  npCityRef: z.string().optional(),
  npCityName: z.string().optional(),
  npDeliveryType: z.enum(['warehouse', 'postomat', 'courier']).optional(),
  npWarehouseRef: z.string().optional(),
  npWarehouseName: z.string().optional(),

  agree: z.boolean().refine(Boolean, {
    message: i18n.t('validation.agree_required'),
  }),
}).superRefine((data, ctx) => {
  if (data.deliveryMethod === 'courier') {
    if (!data.city || data.city.length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['city'],
        message: i18n.t('validation.enter_city'),
      })
    }
    if (!data.street || data.street.length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['street'],
        message: i18n.t('validation.enter_street'),
      })
    }
  }

  if (data.deliveryMethod === 'novaPoshta') {
    if (!data.npCityRef) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['npCityRef'],
        message: i18n.t('validation.enter_city'),
      })
    }
    if (!data.npDeliveryType) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['npDeliveryType'],
        message: i18n.t('validation.enter_np_delivery_type'),
      })
    }
    if (
      (data.npDeliveryType === 'warehouse' || data.npDeliveryType === 'postomat') &&
      !data.npWarehouseRef
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['npWarehouseRef'],
        message: i18n.t('validation.enter_np_warehouse'),
      })
    }
  }
})

export type CartFormData = z.infer<ReturnType<typeof getCartFormSchema>>
