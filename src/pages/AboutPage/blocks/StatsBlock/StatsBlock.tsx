import cls from './StatsBlock.module.scss'
import { useTranslation } from 'react-i18next'

export const StatsBlock = () => {
  const { t } = useTranslation()

  const stats = [
    { value: t('about_page.stat_1_value'), label: t('about_page.stat_1_label') },
    { value: t('about_page.stat_2_value'), label: t('about_page.stat_2_label') },
    { value: t('about_page.stat_3_value'), label: t('about_page.stat_3_label') },
    { value: t('about_page.stat_4_value'), label: t('about_page.stat_4_label') },
  ]

  return (
    <section className={cls.stats}>
      <div className={cls.inner}>
        {stats.map((s) => (
          <div key={s.label} className={cls.stat}>
            <p className={cls.value}>{s.value}</p>
            <p className={cls.label}>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
