import cls from './CompanyOffice.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { AppLink } from '@/shared/ui'
import { memo } from 'react'

interface CompanyOfficeProps {
  className?: string

}
export const CompanyOffice = memo(({ className }: CompanyOfficeProps) => {
  const { t } = useTranslation()

  return (
    <div className={classNames(cls.companyOffice, {}, [className])}>
      <div className={cls.flex}>
        <div>
          <AppLink to={`tel:+38066276433`} className={cls.phone}>+38066276433</AppLink>
          <p className={cls.additional}>{t('working days')}: {t('working hours 2')}</p>
          <p className={cls.additional}>{t('free call')}</p>
        </div>
        <div className={cls.links}>
          <AppLink to={'#'}>Instagram</AppLink>
          <AppLink to={'#'}>Facebook</AppLink>
          <AppLink to={'#'}>Youtube</AppLink>
          <AppLink to={'#'}>Threads</AppLink>
        </div>
      </div>

      <div>
        <p className={cls.apps}>
          <span>Telegram:</span>{' '}
          <span>tattoo28_bot</span>
        </p>

        <p className={cls.apps}>
          <span>Skype:</span>{' '}
          <span>tattoo_28opt.ua</span>
        </p>
      </div>

      <p className={cls.info}>{t('info about order processing time')}</p>

      <div>
        <p className={classNames(cls.info, cls.bold)}>{t('pickup point info')}</p>
        <p className={cls.info}>{t('official company name')}</p>
        <p className={cls.info}>{t('company code')}</p>
      </div>
    </div>
  )
})