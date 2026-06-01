import cls from './StoryBlock.module.scss'
import { useTranslation } from 'react-i18next'
import { PageTwoColumnLayout } from '@/shared/layouts'
import AboutImg from '@/shared/assets/others/about.png'

export const StoryBlock = () => {
  const { t } = useTranslation()

  return (
    <section className={cls.story}>
      <h4 className="blockTitle container">{t('about_page.story_title')}</h4>
      <PageTwoColumnLayout
        left={
          <div className={cls.textContent}>
            <p className={cls.text}>{t('about_info.1')}</p>
            <p className={cls.text}>{t('about_info.2')}</p>
          </div>
        }
        right={<img src={AboutImg} alt={t('about')} className={cls.img} />}
      />
    </section>
  )
}
