import cls from './About.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import AboutImg from '@/shared/assets/others/about.png'
import { Button } from '@/shared/ui'
import { memo } from 'react'

interface AboutProps {
  className?: string
}
export const About = memo(({ className }: AboutProps) => {
  const { t } = useTranslation()

  return (
    <div className={classNames(cls.about, 'left-container', {}, [className])}>
      <img src={AboutImg} alt="about us picture" className={cls.img}/>
      <div className={cls.info}>
        <h3 className={cls.title}>{t('tattoo shop')}</h3>
        <p className={cls.content}>{t('about_info.1')}</p>
        <p className={cls.content}>{t('about_info.2')}</p>
        <Button className={cls.btn}>{t('about company btn')}</Button>
      </div>
    </div>
  )
})