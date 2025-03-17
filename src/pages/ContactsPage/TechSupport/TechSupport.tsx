import { useTranslation } from 'react-i18next'
import { PersonalDataCard } from '@/entities'
import { personalManager } from '@/mockData.tsx'

export const TechSupport = () => {
  const { t } = useTranslation()

  return (
    <PersonalDataCard
      position={t('tech support')}
      avatar={personalManager.avatar}
      name={personalManager.name}
      phone={personalManager.phone}
      email={personalManager.email}
      viber={personalManager.viber}
      telegram={personalManager.telegram}
      whatsup={personalManager.whatsup}
      status="offline"
      additionalInfo={t('contact our support')}
    />
  )
}

