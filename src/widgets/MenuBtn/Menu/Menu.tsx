import cls from './Menu.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { navLinks } from '../../NavBar/NavBar.tsx'
import { RoutePaths, getCatalogDetailsPage } from '@/shared/config/routeConfig/routeConfig.tsx'
import { catalogContent } from '@/features/CatalogTabs/data.ts'
import { AppLink, Search } from '@/shared/ui'
import { useState } from 'react'
import { ContactLink } from '@/shared/ui'
import { companyData } from '@/mockData.tsx'
import ViberIcon from '@/shared/assets/general/viber.svg?react'
import TelegramIcon from '@/shared/assets/general/telegram.svg?react'
import WhatsupIcon from '@/shared/assets/general/whatsup.svg?react'
import CallIcon from '@/shared/assets/general/call.svg?react'
import MailIcon from '@/shared/assets/general/mail.svg?react'
import ArrowLeft from '@/shared/assets/general/arrow-left.svg?react'
import { useUpdateContentWidth } from '@/shared/libs';

interface MenuProps {
  className?: string
  isOpen: boolean
}

type MenuLink = {
  name: string,
  href: string,
  subLinks?: Omit<MenuLink, 'subLinks'>[]
}

const menuLinks: MenuLink[] = [
  {
    name: 'catalog',
    href:  RoutePaths.catalog,
    subLinks: catalogContent.category.map((item) => ({
      name: item,
      href: getCatalogDetailsPage(item)
    }))
  },
  ...navLinks,
  {
    name: 'favorites',
    href: RoutePaths.favorites
  },
  {
    name: 'profile',
    href: RoutePaths.profile
  }
]

interface SubLinksProps {
  links?: MenuLink[]
  isOpen: boolean
}
const SubLinks = ({ links, isOpen }: SubLinksProps) => {
  const { t } = useTranslation()

  if(!links) return null

  return (
    <ul className={classNames(cls.sublinks, { [cls.open]: isOpen })}>
      <div className="decorator vertical full croppedPoligon" />
      {links.map(link => (
        <li key={link.href} className={cls.sublink}>
          <AppLink key={link.name} to={link.href}>{t(link.name)}</AppLink>
        </li>
      ))}
    </ul>
  )
}

const LinkWithSublinks = (props: MenuLink) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button className={cls.btn} onClick={() => setIsOpen(prevState => !prevState)}>
        <span>{props.name}</span>
        <span className={classNames(cls.arrow, { [cls.up]: isOpen})}><ArrowLeft /></span>
      </button>
      <SubLinks links={props.subLinks} isOpen={isOpen} />
    </>
  )
}

export const Menu = ({ className, isOpen }: MenuProps) => {
  const { t } = useTranslation()

  useUpdateContentWidth(isOpen)

  return (
    <nav className={classNames(cls.menu, {[cls.open]: isOpen, [cls.hidden]: !isOpen}, [className])}>
      <div className={cls.wrapper}>
        <div className={cls.upper}>
          <div className="decorator full top croppedPoligon"/>

          <ul className={classNames(cls.links, 'container')}>
            {menuLinks.map((link) => {

              return (
                <li className={cls.link} key={link.href}>
                  {link.subLinks
                    ? <LinkWithSublinks {...link} />
                    : <AppLink key={link.name} to={link.href}>{t(link.name)}</AppLink>}
                </li>
              )
            })}
          </ul>

          <div className="container">
            <Search className={cls.search}/>
          </div>
        </div>

        <div className={cls.down}>
          <div className="decorator full top croppedPoligon"/>
          <div className="container">
            <ContactLink href={`tel:${companyData.tel.link}`} icon={<CallIcon />} className={cls.contacts}>
              {companyData.tel.link}
            </ContactLink>
            <div className={cls.socialMedias}>
              <AppLink to={`viber://contact?number=${companyData.viber.link}`} >
                <ViberIcon/>
              </AppLink>
              <AppLink to={`https://wa.me/${companyData.whatsapp.link}`}>
                <WhatsupIcon/>
              </AppLink>
              <AppLink to={`https://t.me/${companyData.telegram.link}`}>
                <TelegramIcon/>
              </AppLink>
            </div>

            <p className={cls.workingHours}>
              {t('working hours')}
            </p>

            <ContactLink href={`mailto:${companyData.email.link}`} icon={<MailIcon />} className={cls.contacts}>
              {companyData.email.text}
            </ContactLink>
          </div>
        </div>
      </div>
    </nav>
  )
}