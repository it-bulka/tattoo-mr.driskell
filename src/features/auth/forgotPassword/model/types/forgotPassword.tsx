import { z } from 'zod';
import i18n from '@/shared/config/i18n/i18n.tsx';

export const ForgotPasswordSchema = z.object({
  email: z.string().email(i18n.t('validation.invalid_email'))
})

export type ForgotPasswordInputs= z.infer<typeof ForgotPasswordSchema>