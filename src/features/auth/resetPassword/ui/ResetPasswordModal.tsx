import { Modal, CheckBox, AppLink } from '@/shared/ui'
import { useTranslation } from 'react-i18next'
import { Auth } from '@/features/auth/components'

export const ResetPasswordModal = () => {
  const { t } = useTranslation('auth')

  return (
    <Modal isOpen>
      <Auth.Content>
        <Auth.Title>Особистий кабінет</Auth.Title>
        <Auth.Input label={t('enter password')} />
        <Auth.Input label={t('confirm password')} />
        <Auth.Button>{t('confirm')}</Auth.Button>
        <CheckBox
          label={t('agree to the Terms of Service')}
        />
        <AppLink to={'/'}>{t('already have account')}</AppLink>
      </Auth.Content>
    </Modal>
  )
}