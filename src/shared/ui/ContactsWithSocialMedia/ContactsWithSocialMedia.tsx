import { AppLink, ContactLink, ContactsWrapper } from '@/shared/ui'
import CallIcon from '@/shared/assets/general/call.svg?react'
import { memo } from 'react'
import { ContactWrapperGap } from '../ContactsWrapper/ContactsWrapper.tsx'

interface ContactsWithSocialMediaProps {
  className?: string
  phone: string
  viber?: string
  telegram?: string
  whatsup?: string
  gap?: ContactWrapperGap
}

export const ContactsWithSocialMedia = memo(({
  className,
  phone,
  viber,
  telegram,
  whatsup,
  gap
}: ContactsWithSocialMediaProps) => {
  return (
    <ContactsWrapper className={(className)} gap={gap}>
      <ContactLink
        href={`tel:${phone}`}
        icon={<CallIcon />}
        bold
      >
        {phone}
      </ContactLink>

      {viber && <AppLink to={viber}>Viber</AppLink>}
      {whatsup && <AppLink to={whatsup}>Whats Ap</AppLink>}
      {telegram && <AppLink to={telegram}>Telegram</AppLink>}
    </ContactsWrapper>
  )
})
ContactsWithSocialMedia.displayName = 'ContactsWithSocialMedia'