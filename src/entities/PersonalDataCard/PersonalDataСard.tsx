import cls from './PersonalDataCard.module.scss'
import classNames from 'classnames'
import {
  OnlineStatus, Status, ContactsWrapper, ContactLink, ContactsWithSocialMedia
} from '@/shared/ui'
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

      <ContactsWithSocialMedia
        phone={phone}
        viber={viber}
        whatsup={whatsup}
        telegram={telegram}
        gap="s"
      />

      {email && (
        <ContactsWrapper className={cls.email}>
          <ContactLink
            href={`mailto:${email}`}
            icon={<MailIcon />}
            textAccent
          >
            {email}
          </ContactLink>
        </ContactsWrapper>
      )}

      {additionalInfo && <p className={cls.additionalInfo}>{additionalInfo}</p>}
    </div>
  )
})

PersonalDataCard.displayName = 'PersonalDataСard'