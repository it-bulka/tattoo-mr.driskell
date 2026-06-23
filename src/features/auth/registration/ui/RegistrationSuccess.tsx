import { useTranslation } from 'react-i18next'

export const RegistrationSuccess = () => {
  const { t } = useTranslation('auth')
  return (
    <div>
      <h6>{t('registration success.title')}</h6>
      <p>{t('registration success.info')}</p>
      <p>{t('check spam')}</p>
    </div>
  )
}