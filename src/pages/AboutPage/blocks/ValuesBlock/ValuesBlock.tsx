import cls from './ValuesBlock.module.scss'
import { useTranslation } from 'react-i18next'
import { FeatureItem } from '@/shared/ui'

export const ValuesBlock = () => {
  const { t } = useTranslation()

  const values = [
    { title: t('about_page.value_1_title'), desc: t('about_page.value_1_desc') },
    { title: t('about_page.value_2_title'), desc: t('about_page.value_2_desc') },
    { title: t('about_page.value_3_title'), desc: t('about_page.value_3_desc') },
    { title: t('about_page.value_4_title'), desc: t('about_page.value_4_desc') },
  ]

  return (
    <section className={cls.values}>
      <div className="container">
        <h4 className="blockTitle">{t('about_page.values_title')}</h4>
        <div className={cls.list}>
          {values.map((v) => (
            <FeatureItem key={v.title} title={v.title} decription={v.desc} />
          ))}
        </div>
      </div>
    </section>
  )
}
