import cls from './PersonalDataCardMini.module.scss'
import classNames from 'classnames'
import { IPersonalData } from '../PersonalDataCard/PersonalDataСard.tsx'
import { AppLink, ContactLink, OnlineStatus } from '@/shared/ui'
import CallIcon from '@/shared/assets/general/call.svg?react'
import MailIcon from '@/shared/assets/general/mail.svg?react'
import { memo } from 'react'

interface PersonalDataCardMiniProps extends Omit<IPersonalData, 'additionalInfo' | 'position'>{
  className?: string
}
export const PersonalDataCardMini = memo(({
  className,
  avatar,
  name,
  phone,
  viber,
  telegram,
  whatsup,
  email,
  status
}: PersonalDataCardMiniProps) => {
  return (
    <div className={classNames(cls.personalDataCardMini, {}, [className])}>
      <div className={classNames(cls.img, {}, [ cls[status] ])}>
        <img src={avatar} alt={`${name} avatar`} />
      </div>

      <p className={cls.name}>{name}</p>

      <OnlineStatus status={status} className={cls.status} />

      <div className={cls.contacts}>
        <ContactLink
          href={`tel:${phone}`}
          icon={<CallIcon />}
          bold
        >
          {phone}
        </ContactLink>

        <ContactLink
          href={`mailto:${email}`}
          icon={<MailIcon />}
          className={cls.email}
        >
          {email}
        </ContactLink>

        <div className={cls.socials}>
          {viber && <AppLink to={viber} className={cls.pill}>Viber</AppLink>}
          {whatsup && <AppLink to={whatsup} className={cls.pill}>WhatsApp</AppLink>}
          {telegram && <AppLink to={telegram} className={cls.pill}>Telegram</AppLink>}
        </div>
      </div>
    </div>
  )
})
