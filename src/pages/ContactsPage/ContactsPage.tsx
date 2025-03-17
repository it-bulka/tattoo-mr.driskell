import cls from './ContactsPage.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '@/shared/ui'
import { TechSupport } from './TechSupport/TechSupport.tsx'
import { personalManager } from '@/mockData.tsx'
import { PersonalDataCardMini } from '@/entities'
import { CompanyOffice } from './CompanyOffice/CompanyOffice.tsx'
import { PageTwoColumnLayout } from '@/shared/layouts'

const cards = Array.from({ length: 4 }, (_, i) => ({ id: i, ...personalManager}))

const ContactsPage = () => {
  const { t } = useTranslation()

  return (
    <div>
      <Breadcrumbs className="container" />
      <h3 className={classNames("pageTitle container")}>{t('contacts')}</h3>

      <h4 className={classNames(cls.blockTitle, "blockTitle container")}>{t('company office')}</h4>
      <PageTwoColumnLayout
        className={cls.companyData}
        left={<CompanyOffice />}
        right={<TechSupport />}
      />

      <h4 className={classNames(cls.blockTitle, "blockTitle container")}>{t('managers')}</h4>
      <PageTwoColumnLayout
        className={cls.companyData}
        left={(
          <div className={cls.managers}>
            {cards.map((card) => (
              <PersonalDataCardMini
                key={card.id}
                name={card.name}
                avatar={card.avatar}
                viber={card.viber}
                telegram={card.telegram}
                whatsup={card.whatsup}
                status="offline"
                phone={card.phone}
                email={card.email}
              />
            ))}
          </div>
        )}
        right={<></>}
      />
    </div>
  )
}

export default ContactsPage