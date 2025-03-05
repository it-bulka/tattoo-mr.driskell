import cls from './Footer.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import { AppLink } from '@/shared/ui'
import Logo from '@/shared/assets/general/logo.png';
import CallIcon from '@/shared/assets/general/call.svg?react'
import TelegramIcon from '@/shared/assets/general/telegram.svg?react'
import ViberIcon from '@/shared/assets/general/viber.svg?react'
import RingIcon from '@/shared/assets/general/ring.svg?react'
import MailIcon from '@/shared/assets/general/mail.svg?react'

interface FooterProps {
  className?: string
}
export const Footer = memo(({ className }: FooterProps) => {
  const { t } = useTranslation()

  return (
    <footer className={classNames(cls.footer, {}, [className])}>
      <div className={classNames('container', cls.content)}>
        <div className={cls.linksWrapper}>
          <div className={cls.logoWrapper}>
            <img src={Logo} alt="logo" className={cls.logo}/>
            <AppLink to={'/'}>{t('privacy policy')}</AppLink>
          </div>
          <div className={cls.links}>
            <AppLink to={'/'}>{t('promo codes')}</AppLink>
            <AppLink to={'/'}>{t('discounts')}</AppLink>
            <AppLink to={'/'}>{t('help')}</AppLink>
          </div>
          <div className={cls.links}>
            <AppLink to={'/'}>{t('about')}</AppLink>
            <AppLink to={'/'}>{t('contact')}</AppLink>
          </div>
        </div>

        <div className={cls.contacts}>
          <div>
            <AppLink to="tel:+380676276433" className={cls.linkFull}>
              <CallIcon />
              <span>+380676276433</span>
            </AppLink>
            <div className={cls.mediaLinks}>
              <AppLink to="https://t.me/iva147iva147">
                <TelegramIcon />
              </AppLink>
              <AppLink to="https://wa.me/380676276433">
                <RingIcon />
              </AppLink>
              <AppLink to="viber://contact?number=%2B380676276433">
                <ViberIcon />
              </AppLink>
            </div>
          </div>
          <p className={cls.workHours}>{t('working hours')}</p>
          <AppLink to="mailto:i.it.bulka@gmail.com" className={cls.linkFull}>
            <MailIcon />
            <span>Mr.Driskell@gmail.com</span>
          </AppLink>
        </div>
      </div>
    </footer>
  )
})

Footer.displayName = 'Footer'