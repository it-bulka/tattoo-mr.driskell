import cls from './PersonalManager.module.scss'
import classNames from 'classnames'
import { AppLink, OnlineStatus } from '@/shared/ui'
import { useTranslation } from 'react-i18next'
import CallIcon from '@/shared/assets/general/call.svg?react'
import MailIcon from '@/shared/assets/general/mail.svg?react'
import { memo } from 'react'

interface IPersonalManager {
  avatar: string
  name: string
  phone: string
  email: string
  viber?: string
  telegram?: string
  whatsup?: string
}

interface PersonalManagerProps extends IPersonalManager {
  className?: string
}
export const PersonalManager = memo(({
  className,
  avatar,
  name,
  phone,
  viber,
  telegram,
  whatsup,
  email
}: PersonalManagerProps) => {
  const { t } = useTranslation()

  return (
    <div className={classNames(cls.personalManager, {}, [className])}>
      <div className={cls.general}>
        <img src={avatar} alt={`${name} avatar`} className={cls.img}/>
        <div className={cls.info}>
          <p className={cls.managerTitle}>{t('your manager')}</p>
          <p className={cls.name}>{name}</p>
          <OnlineStatus status="offline" />
        </div>
      </div>

      <div className={cls.contacts}>
        <AppLink to={`tel:${phone}`} className={classNames(cls.linkFull, {}, [cls.bold])}>
          <CallIcon />
          <span>{phone}</span>
        </AppLink>
        {viber && <AppLink to={viber}>Viber</AppLink>}
        {whatsup && <AppLink to={whatsup}>Whats Ap</AppLink>}
        {telegram && <AppLink to={telegram}>Telegram</AppLink>}
      </div>

      <div className={cls.contacts}>
        <AppLink to={`mailto:${email}`} className={cls.linkFull}>
          <MailIcon />
          <span className={cls.accent}>Mr.Driskell@gmail.com</span>
        </AppLink>
      </div>

      <p className={cls.workingHours}>
        {t('working days')} <br />
        {t('working hours 2')}
      </p>
    </div>
  )
})

PersonalManager.displayName = 'PersonalManager'