import cls from './Profile.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '@/shared/ui'
import { CartForm } from '@/entities'
import { Histories } from './Histories/Histories.tsx'
import { PersonalManager } from './PersonalManager/PersonalManager.tsx'
import { personalManager } from '@/mockData.tsx'

interface ProfileProps {
  className?: string
}
const Profile = ({ className }: ProfileProps) => {
  const { t } = useTranslation()

  return (
    <div className={classNames(cls.profile, {}, [className, 'container', 'pageSpacing'])}>
      <div>
        <Breadcrumbs />
        <h3 className="pageTitle">{t('profile')}</h3>
        <CartForm />
        <Histories />
      </div>

      <div className={cls.additional}>
        <p className={cls.discount}>
          {t('personal discount')} <span className={cls.amount}>15%</span>
        </p>

        <PersonalManager
          avatar={personalManager.avatar}
          name={personalManager.name}
          phone={personalManager.phone}
          email={personalManager.email}
          viber={personalManager.viber}
          telegram={personalManager.telegram}
          whatsup={personalManager.whatsup}
        />
      </div>
    </div>
  )
}

export default Profile