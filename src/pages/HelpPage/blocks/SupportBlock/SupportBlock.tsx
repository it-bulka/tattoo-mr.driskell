import cls from './SupportBlock.module.scss'
import { useTranslation } from 'react-i18next'
import { ContactsWithSocialMedia } from '@/shared/ui/ContactsWithSocialMedia/ContactsWithSocialMedia'
import { PageTwoColumnLayout } from '@/shared/layouts'
import { companyData } from '@/mockData'

export const SupportBlock = () => {
  const { t } = useTranslation()

  return (
    <section className={cls.support}>
      <h4 className="blockTitle container">{t('help_page.support_title')}</h4>
      <PageTwoColumnLayout
        left={
          <div className={cls.contactsCard}>
            <p className={cls.supportDesc}>{t('help_page.support_desc')}</p>
            <ContactsWithSocialMedia
              phone={companyData.tel.link}
              viber={companyData.viber.link}
              telegram={companyData.telegram.link}
              whatsup={companyData.whatsapp.link}
            />
          </div>
        }
        right={
          <div className={cls.hoursCard}>
            <p className={cls.hoursTitle}>{t('help_page.support_hours_title')}</p>
            <p className={cls.hoursText}>{t('working days')}</p>
            <p className={cls.hoursText}>{t('working hours')}</p>
          </div>
        }
      />
    </section>
  )
}
