import { Modal } from '@/shared/ui'
import { Auth } from '@/features/auth/components'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { useAppDispatch } from '@/app/providers/StoreProvider/config/store.ts'
import { logoutThunk } from '../../model/services/logoutThunk.ts'
import { getHomePage } from '@/shared/config/routeConfig/routeConfig.tsx'
import { useState } from 'react'
import cls from './LogoutModal.module.scss'

interface LogoutModalProps {
  isOpen: boolean
  onClose: () => void
}

export const LogoutModal = ({ isOpen, onClose }: LogoutModalProps) => {
  const { t } = useTranslation('auth')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    await dispatch(logoutThunk())
    onClose()
    navigate(getHomePage(), { replace: true })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Auth.Content>
        <div className={cls.wrap}>
          <Auth.Title>{t('logout title')}</Auth.Title>
          <p>{t('logout confirm')}</p>
          <div className={cls.actions}>
            <Auth.Button onClick={handleLogout} disabled={isLoading}>
              {t('logout')}
            </Auth.Button>
            <button type="button" className={cls.cancel} onClick={onClose}>
              {t('cancel')}
            </button>
          </div>
        </div>
      </Auth.Content>
    </Modal>
  )
}
