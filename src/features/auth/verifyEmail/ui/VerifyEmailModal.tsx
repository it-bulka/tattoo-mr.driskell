import { Modal } from '@/shared/ui'
import { useTranslation } from 'react-i18next'
import { Auth } from '@/features/auth/components'
import { useVerifyEmailConfirm } from '../model/libs/useVerifyEmailConfirm.tsx'

export const VerifyEmailModal = () => {
  const { t } = useTranslation('auth')
  const onConfirm = useVerifyEmailConfirm()

  return (
    <Modal isOpen>
      <Auth.Content>
        <Auth.Title>{t('email verification')}</Auth.Title>
        <Auth.Input label={t('your email')} readOnly/>
        <Auth.Button onClick={onConfirm}>{t('confirm')}</Auth.Button>
      </Auth.Content>
    </Modal>
  )
}