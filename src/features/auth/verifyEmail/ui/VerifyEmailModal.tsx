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

  const goHome = () => navigate(getHomePage())

  return (
    <Modal isOpen>
      <Auth.Content isLoading={status === 'loading'}>
        <Auth.Title>
          {status === 'loading' && t('email verification')}
          {status === 'success' && t('email verified')}
          {status === 'error' && t('verification failed')}
        </Auth.Title>
        {status === 'error' && (
          <>
            <p>{error}</p>
            <Auth.Button onClick={goHome}>{t('back to login')}</Auth.Button>
          </>
        )}
      </Auth.Content>
    </Modal>
  )
}
