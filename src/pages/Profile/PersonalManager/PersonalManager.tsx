import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import { PersonalDataCard } from '@/entities'
import { personalManager } from '@/mockData.tsx';

export const PersonalManager = memo(() => {
  const { t } = useTranslation()

  return (
    <PersonalDataCard
      position={t('your manager')}
      avatar={personalManager.avatar}
      name={personalManager.name}
      phone={personalManager.phone}
      email={personalManager.email}
      viber={personalManager.viber}
      telegram={personalManager.telegram}
      whatsup={personalManager.whatsup}
      status="offline"
      additionalInfo={(
        <>
          {t('working days')} <br />{t('working hours 2')}
        </>
      )}
    />
  )
})

PersonalManager.displayName = 'PersonalManager'