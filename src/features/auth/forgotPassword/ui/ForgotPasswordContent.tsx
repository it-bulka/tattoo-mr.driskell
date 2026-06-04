import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { memo } from 'react'
import { Auth } from '@/features/auth/components'
import { getForgotPasswordSchema, ForgotPasswordFormData } from '@/features/auth/model/types/forgotPassword.ts'

interface ForgotPasswordContentProps {
  onSubmit: (data: { email: string }) => void
  onOpenLogin: () => void
  onOpenRegister: () => void
  isSubmitting?: boolean
}

export const ForgotPasswordContent = memo(({
  onSubmit,
  onOpenLogin,
  onOpenRegister,
  isSubmitting,
}: ForgotPasswordContentProps) => {
  const { t } = useTranslation('auth')

  const {
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
  } = useForm<ForgotPasswordFormData>({
    defaultValues: { email: '' },
    resolver: zodResolver(getForgotPasswordSchema()),
  })

  const submitHandler = handleSubmit((data) => onSubmit(data))

  return (
    <>
      <form onSubmit={submitHandler}>
        <Auth.Title>{t('password recovery')}</Auth.Title>

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Auth.Input
              label={t('enter email')}
              error={errors.email?.message}
              onInput={() => clearErrors('email')}
              {...field}
            />
          )}
        />

        <Auth.Button disabled={isSubmitting}>{t('recover password')}</Auth.Button>
      </form>

      <button type="button" onClick={onOpenLogin}>{t('back to login')}</button>
      <button type="button" onClick={onOpenRegister}>{t('register account')}</button>
    </>
  )
})

ForgotPasswordContent.displayName = 'ForgotPasswordContent'
