import { useTranslation } from 'react-i18next'
import { Auth } from '@/features/auth/components'

interface ForgotPasswordSuccessProps {
  onOpenLogin: () => void
}

export const ForgotPasswordSuccess = ({ onOpenLogin }: ForgotPasswordSuccessProps) => {
  const { t } = useTranslation('auth')
  return (
    <div>
      <Auth.Title>{t('password recovery success.title')}</Auth.Title>
      <p>{t('password recovery success.info')}</p>
      <button type="button" onClick={onOpenLogin}>{t('back to login')}</button>
    </div>
  )
}
