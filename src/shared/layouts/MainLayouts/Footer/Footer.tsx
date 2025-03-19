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
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx'
import { companyData } from '@/mockData.tsx'

interface FooterProps {
  className?: string
}
export const Footer = memo(({ className }: FooterProps) => {
  const { t } = useTranslation()

  return (
    <footer className={classNames(cls.footer, {}, [className])}>
      <div className={cls.content}>
        <div className={cls.linksWrapper}>
          <div className={cls.logoWrapper}>
            <img src={Logo} alt="logo" className={cls.logo}/>
            {/* TODO: add download file */}
            <AppLink to={'/'}>{t('privacy policy')}</AppLink>
          </div>
          <div className={cls.links}>
            <AppLink to={RoutePaths.promo_codes}>{t('promo codes')}</AppLink>
            <AppLink to={RoutePaths.discounts}>{t('discounts')}</AppLink>
            <AppLink to={'/'}>{t('help')}</AppLink>
          </div>
          <div className={cls.links}>
            <AppLink to={RoutePaths.about}>{t('about')}</AppLink>
            <AppLink to={RoutePaths.contacts}>{t('contact')}</AppLink>
          </div>
        </div>

        <div className={cls.contacts}>
          <div>
            <AppLink to={`tel:${companyData.tel.link}`} className={cls.linkFull}>
              <CallIcon />
              <span>{companyData.tel.link}</span>
            </AppLink>
            <div className={cls.mediaLinks}>
              <AppLink to={`https://t.me/${companyData.telegram.link}}`}>
                <TelegramIcon />
              </AppLink>
              <AppLink to={`https://wa.me/${companyData.whatsapp.link}}`}>
                <RingIcon />
              </AppLink>
              <AppLink to={`viber://contact?number=${companyData.viber.link}`}>
                <ViberIcon />
              </AppLink>
            </div>
          </div>
          <p className={cls.workHours}>{t('working hours')}</p>
          <AppLink to={`mailto:${companyData.email.link}`} className={cls.linkFull}>
            <MailIcon />
            <span>{companyData.email.text}</span>
          </AppLink>
        </div>
      </div>
    </footer>
  )
})

Footer.displayName = 'Footer'