import { Modal, CheckBox, AppLink } from '@/shared/ui'
import { Auth } from '@/features/auth/components'
import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getLoginSchema } from '@/features/auth/model/types/login.ts'
import { useAppDispatch } from '@/app/providers/StoreProvider/config/store.ts';

export const LoginModal = () => {
  const { t } = useTranslation('auth')
  const dispatch = useAppDispatch()

  const {
    handleSubmit,
    control
  } = useForm({
    resolver: zodResolver(getLoginSchema())
  })

  const onSubmit = handleSubmit(() => {

  })

  return (
    <Modal isOpen>
      <Auth.Content>
        <Auth.Title>{t('login')}</Auth.Title>
        <form onSubmit={onSubmit}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Auth.Input label={t('enter email')} {...field}/>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Auth.Input label={t('enter password')} {...field}/>
            )}
          />

          <Auth.Button>{t('registration')}</Auth.Button>

          <Controller
            control={control}
            name="agree"
            render={({ field }) => (
              <CheckBox
                label={t('agree to the Terms of Service')}
                {...field}
              />
            )}
          />
        </form>
        <AppLink to={'/'}>{t('register account')}</AppLink>
        <AppLink to={'/'}>{t('forgot password')}</AppLink>
      </Auth.Content>
    </Modal>
  )
}