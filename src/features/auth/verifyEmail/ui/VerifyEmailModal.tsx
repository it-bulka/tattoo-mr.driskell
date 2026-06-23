import { Modal } from '@/shared/ui'
import { useTranslation } from 'react-i18next'
import { Auth } from '@/features/auth/components'
import { useVerifyEmailConfirm } from '../model/libs/useVerifyEmailConfirm.tsx'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { getHomePage } from '@/shared/config/routeConfig/routeConfig.tsx'

export const VerifyEmailModal = () => {
  const { t } = useTranslation('auth')
  const { status, error } = useVerifyEmailConfirm()
  const navigate = useNavigate()

  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => navigate(getHomePage()), 1500)
      return () => clearTimeout(timer)
    }
  }, [status, navigate])

  return (
    <Modal isOpen>
      <Auth.Content isLoading={status === 'loading'} error={status === 'error' ? (error || t('verification failed')) : undefined}>
        {status === 'loading' && (
          <Auth.Title>{t('email verification')}</Auth.Title>
        )}
        {status === 'success' && (
          <Auth.Title>{t('email verified')}</Auth.Title>
        )}
      </Auth.Content>
    </Modal>
  )
}
