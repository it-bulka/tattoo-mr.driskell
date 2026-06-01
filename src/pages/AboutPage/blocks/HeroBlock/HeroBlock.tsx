import cls from './HeroBlock.module.scss'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui'
import { useNavigate } from 'react-router'
import { getCatalogPage } from '@/shared/config/routeConfig/routeConfig'
import AboutImg from '@/shared/assets/others/about.png'

export const HeroBlock = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className={cls.hero}>
      <img src={AboutImg} alt="" className={cls.bg} aria-hidden="true" />
      <div className={cls.overlay} />
      <div className={cls.content}>
        <h1 className={cls.title}>{t('about_page.hero_title')}</h1>
        <p className={cls.subtitle}>{t('about_page.hero_subtitle')}</p>
        <Button center onClick={() => navigate(getCatalogPage())}>{t('about_page.hero_cta')}</Button>
      </div>
    </div>
  )
}
