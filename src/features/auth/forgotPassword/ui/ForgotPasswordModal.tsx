import { Modal, CheckBox, AppLink } from '@/shared/ui'
import { Auth } from '@/features/auth/components'
import { useTranslation } from 'react-i18next'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { ForgotPasswordInputs } from '../model/types/forgotPassword.tsx'
import { useSendForgotPasswordEmailMutation } from '../../model/api/auth.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { getForgotPasswordSchema } from '../../model/types/forgotPassword.ts';

export const ForgotPasswordModal = () => {
  const { t } = useTranslation('auth')
  const [sendEmail, { isLoading, isError, isSuccess }] = useSendForgotPasswordEmailMutation()
  const {
    handleSubmit,
    control
  } = useForm<ForgotPasswordInputs>({
    resolver: zodResolver(getForgotPasswordSchema())
  })

  const onSubmit: SubmitHandler<ForgotPasswordInputs> = async (data) => {
    sendEmail(data.email)
  }

  return (
    <Modal isOpen>
      <Auth.Content error={'cnfkkkkkkk kkkk'}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Auth.Title>{t('password recovery')}</Auth.Title>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Auth.Input  {...field} label={t('enter email')}  />
            )}
          />
          <Auth.Button>{t('recover password')}</Auth.Button>
          <CheckBox
            label={t('agree to the Terms of Service')}
          />
          <AppLink to={'/'}>{t('back to login')}</AppLink>
          <AppLink to={'/'}>{t('register account')}</AppLink>
        </form>
      </Auth.Content>
    </Modal>
  )
}