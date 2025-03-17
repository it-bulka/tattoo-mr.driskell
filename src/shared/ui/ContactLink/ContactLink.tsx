import cls from './ContactLink.module.scss'
import classNames from 'classnames'
import { AppLink } from '@/shared/ui';
import { ReactNode, PropsWithChildren, memo } from 'react'

interface ContactLinkProps {
  className?: string
  href: string
  icon: ReactNode
  bold?: boolean
  textAccent?: boolean
}
export const ContactLink = memo(({
  className,
  icon,
  href,
  children,
  bold = false,
  textAccent = false
}: PropsWithChildren<ContactLinkProps>) => {
  return (
    <AppLink to={href} className={classNames(cls.linkFull, {[cls.bold]: bold}, [className])}>
      {icon}
      <span className={classNames('', { [cls.accent]: textAccent})}>{children}</span>
    </AppLink>
  )
})