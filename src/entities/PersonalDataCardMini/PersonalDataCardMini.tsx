import cls from './PersonalDataCardMini.module.scss'
import classNames from 'classnames'
import { IPersonalData } from '../PersonalDataCard/PersonalDataСard.tsx'
import { ContactLink, ContactsWithSocialMedia, ContactsWrapper, OnlineStatus } from '@/shared/ui'
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

      <ContactsWithSocialMedia
        phone={phone}
        viber={viber}
        whatsup={whatsup}
        telegram={telegram}
      />

      <ContactsWrapper>
        <ContactLink
          href={`mailto:${email}`}
          icon={<MailIcon />}
          className={cls.email}
        >
          {email}
        </ContactLink>
      </ContactsWrapper>

      <OnlineStatus status={status} className={cls.status} />
    </div>
  )
})