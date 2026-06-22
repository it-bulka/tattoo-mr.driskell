import { Modal, ErrorMsg } from '@/shared/ui'
import { useTranslation } from 'react-i18next'
import { Auth } from '@/features/auth/components'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getResetPasswordSchema, ResetPasswordFormData } from '../../model/types/resetPassword'
import { useResetPasswordMutation } from '../../model/api/auth'
import { useSearchParams, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { getHomePage } from '@/shared/config/routeConfig/routeConfig'

export const ResetPasswordModal = () => {
  const { t } = useTranslation('auth')
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [resetPassword] = useResetPasswordMutation()

  const token = searchParams.get('token') || ''
  const email = searchParams.get('email') || ''

  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(getResetPasswordSchema()),
    defaultValues: { password: '', confirmPassword: '' },
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      await resetPassword({ email, token, password: data.password }).unwrap()
      toast.success(t('password reset success'))
      navigate(getHomePage())
    } catch {
      toast.error(t('password reset error'))
    }
  })

  return (
    <Modal isOpen>
      <Auth.Content>
        <Auth.Title>{t('reset password')}</Auth.Title>
        <form onSubmit={onSubmit}>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Auth.Input
                label={t('enter password')}
                type="password"
                error={errors.password?.message}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <Auth.Input
                label={t('confirm password')}
                type="password"
                error={errors.confirmPassword?.message}
                {...field}
              />
            )}
          />
          <ErrorMsg text={errors.root?.message} />
          <Auth.Button disabled={isSubmitting}>{t('confirm')}</Auth.Button>
        </form>
      </Auth.Content>
    </Modal>
  )
}
