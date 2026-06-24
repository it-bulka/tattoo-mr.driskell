import { Modal, CloseBtn } from '@/shared/ui'
import { Auth } from '@/features/auth/components'
import { useAuthModals } from '@/shared/libs/authModalsContext'
import { useTranslation } from 'react-i18next'
import cls from './AuthRequiredModal.module.scss'

interface AuthRequiredModalProps {
  isOpen: boolean
  onClose: () => void
}

export const AuthRequiredModal = ({ isOpen, onClose }: AuthRequiredModalProps) => {
  const { t } = useTranslation('favourites')
  const { openLogin, openRegister } = useAuthModals()

  const handleLogin = () => {
    onClose()
    openLogin()
  }

  const handleRegister = () => {
    onClose()
    openRegister()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Auth.Content>
        <CloseBtn className={cls.closeBtn} onClick={onClose} />
        <div className={cls.wrap}>
          <Auth.Title className={cls.title}>{t('auth required title')}</Auth.Title>
          <div className={cls.actions}>
            <button type="button" className={cls.link} onClick={handleLogin}>
              {t('sign in')}
            </button>
            <button type="button" className={cls.link} onClick={handleRegister}>
              {t('create account')}
            </button>
          </div>
        </div>
      </Auth.Content>
    </Modal>
  )
}
