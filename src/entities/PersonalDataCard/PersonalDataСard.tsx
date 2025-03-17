import cls from './PersonalDataCard.module.scss'
import classNames from 'classnames'
import { AppLink, OnlineStatus, Status } from '@/shared/ui'
import CallIcon from '@/shared/assets/general/call.svg?react'
import MailIcon from '@/shared/assets/general/mail.svg?react'
import { memo, ReactNode } from 'react'

export interface IPersonalData {
  avatar: string
  position: string
  name: string
  phone: string
  email: string
  viber?: string
  telegram?: string
  whatsup?: string,
  additionalInfo?: ReactNode
  status: Status
}

interface PersonalManagerProps extends IPersonalData {
  className?: string
}
export const PersonalDataCard = memo(({
   className,
   avatar,
   position,
   name,
   phone,
   viber,
   telegram,
   whatsup,
   email,
   additionalInfo,
  status
}: PersonalManagerProps) => {
  return (
    <div className={classNames(cls.personalDataCard, {}, [className])}>
      <div className={cls.general}>
        <img src={avatar} alt={`${name} avatar`} className={cls.img}/>
        <div className={cls.info}>
          <p className={cls.managerTitle}>{position}</p>
          <p className={cls.name}>{name}</p>
          <OnlineStatus status={status} />
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

      {email && (
        <div className={cls.contacts}>
          <AppLink to={`mailto:${email}`} className={cls.linkFull}>
            <MailIcon />
            <span className={cls.accent}>{email}</span>
          </AppLink>
        </div>
      )}

      {additionalInfo && <p className={cls.additionalInfo}>{additionalInfo}</p>}
    </div>
  )
})

PersonalDataCard.displayName = 'PersonalDataСard'