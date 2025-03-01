import cls from './Header.module.scss'
import CallIcon from '../../../assets/general/call.svg'
import MailIcon from '../../../assets/general/mail.svg'
import { AppLink } from '@/shared/ui'
import { CartCount, LikeCount } from '@/features'
import Logo from '@/shared/assets/general/logo.png'
import { AvatarBtn } from '@/features'
import { Catalog } from '@/widgets'
import { Search } from '@/shared/ui/Search/Search.tsx';
import { useTranslation } from 'react-i18next'
import { NavBar } from '@/widgets'
import { memo } from 'react'

export const Header = memo(() => {
  const { t } = useTranslation()
  return (
    <header className={cls.header}>
      <div className="container">
        <div className={cls.upper}>
          <div className={"decorator full croppedPoligon" }/>
          <div>
            <div className={cls.contacts}>
              <AppLink to="tel:+380676276433" className={cls.linkFull}>
                <CallIcon />
                <span>+380676276433</span>
              </AppLink>
              <AppLink to="viber://contact?number=%2B380676276433">Viber</AppLink>
              <AppLink to="https://wa.me/380676276433">Whats Ap</AppLink>
              <AppLink to="https://t.me/iva147iva147">Telegram</AppLink>
            </div>

            <div className={cls.contacts}>
              <AppLink to="mailto:i.it.bulka@gmail.com" className={cls.linkFull}>
                <MailIcon />
                <span>Mr.Driskell@gmail.com</span>
              </AppLink>
            </div>
          </div>

          <div>
            <img src={Logo} alt="logo" className={cls.logo}/>
          </div>

          <div className={cls.actions}>
            <CartCount />
            <LikeCount />
            <AvatarBtn />
          </div>
        </div>
        <div className={cls.lower}>
          <Catalog />
          <Search
            placeholder={t('search')}
            className={cls.search}
          />
          <NavBar className={cls.navbar}/>
        </div>
      </div>
    </header>
  )
})

Header.displayName = 'Header'