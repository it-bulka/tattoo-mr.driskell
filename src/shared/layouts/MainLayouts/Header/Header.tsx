import cls from './Header.module.scss'
import CallIcon from '../../../assets/general/call.svg?react'
import MailIcon from '../../../assets/general/mail.svg?react'
import { AppLink, ContactLink, ContactsWrapper, HStack } from '@/shared/ui'
import { CartCount, LikeCount, AvatarBtn } from '@/features'
import Logo from '@/shared/assets/general/logo.png'
import { Catalog, MenuBtn, NavBar } from '@/widgets'
import { memo } from 'react'
import classNames from 'classnames'
import { companyData } from '@/mockData.tsx'
import { useDevice } from '@/shared/libs'
import { SearchTattooMachine } from '@/features'
import { Link } from 'react-router'
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx'

const MobileHeader = () => {
  return (
    <div className={cls.row}>
      <MenuBtn />
      <SearchTattooMachine
        className={cls.search}
      />
      <div className={cls.actions}>
        <CartCount />
        <LikeCount className={cls.like}/>
        <AvatarBtn className={cls.avatar}/>
      </div>
    </div>
  )
}

const DesktopHeader = () => {
  return (
    <>
      <div className={cls.upper}>
        <div className={"decorator full croppedPoligon" }/>
        <HStack justify="between">
          <ContactsWrapper inline>
            <ContactLink href={`tel:${companyData.tel.link}`} icon={<CallIcon />}>
              {companyData.tel.link}
            </ContactLink>

            <AppLink to="viber://contact?number=%2B380676276433">Viber</AppLink>
            <AppLink to="https://wa.me/380676276433">Whats Ap</AppLink>
            <AppLink to="https://t.me/iva147iva147">Telegram</AppLink>
          </ContactsWrapper>

          <ContactsWrapper inline>
            <ContactLink href={`mailto:${companyData.email.link}`} icon={<MailIcon />}>
              {companyData.email.text}
            </ContactLink>
          </ContactsWrapper>
        </HStack>

        <div>
          <Link to={RoutePaths.home} className={cls.logo}>
            <img src={Logo} alt="logo" />
          </Link>
        </div>

        <div className={cls.actions}>
          <CartCount />
          <LikeCount />
          <AvatarBtn />
        </div>
      </div>
      <div className={cls.lower}>
        <Catalog />
        <SearchTattooMachine
          className={cls.search}
        />
        <NavBar className={cls.navbar}/>
      </div>
    </>
  )
}

export const Header = memo(({className}: { className?: string}) => {
  const isMobile = useDevice(1200)

  return (
    <header className={classNames(cls.header, {}, [className])}>
      <div className="container">
        {isMobile
          ? <MobileHeader />
          : <DesktopHeader />
        }
      </div>
    </header>
  )
})

Header.displayName = 'Header'