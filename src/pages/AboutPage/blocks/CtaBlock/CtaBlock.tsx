import cls from './CtaBlock.module.scss'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui'
import { useNavigate } from 'react-router'
import { getCatalogPage } from '@/shared/config/routeConfig/routeConfig'

export const CtaBlock = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <section className={cls.cta}>
      <h2 className={cls.title}>{t('about_page.cta_title')}</h2>
      <p className={cls.text}>{t('about_page.cta_text')}</p>
      <Button onClick={() => navigate(getCatalogPage())}>{t('about_page.cta_btn')}</Button>
    </section>
  )
}
