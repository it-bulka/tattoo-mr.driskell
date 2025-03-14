import cls from './AdditionalServicePage.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '@/shared/ui'
import { AdditionalCartInfo } from '@/widgets'
import { Services } from './blocks/Services/Services.tsx'

const AdditionalServicePage = () => {
  const { t } = useTranslation()

  return (
    <div className="pageSpacing">
      <div className="container">
        <Breadcrumbs />
        <h3 className={classNames('pageTitle', cls.title)}>{t('additional services')}</h3>
      </div>

      <div className={classNames(cls.content, 'container')}>
        <Services />
        <AdditionalCartInfo />
      </div>
    </div>
  )
}

export default AdditionalServicePage