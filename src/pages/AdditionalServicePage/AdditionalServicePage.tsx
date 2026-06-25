import cls from './AdditionalServicePage.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '@/shared/ui'
import { AdditionalCartInfo } from '@/widgets'
import { Services } from './blocks/Services/Services.tsx'
import { SeoMeta } from '@/shared/libs'

const AdditionalServicePage = () => {
  const { t } = useTranslation()

  return (
    <div className="pageSpacing">
      <SeoMeta
        title="Додаткові послуги"
        description="Послуги тату-магазину: навчання, сервісне обслуговування обладнання."
      />
      <div className="container">
        <Breadcrumbs />
        <h1 className={classNames('pageTitle', cls.title)}>{t('additional services')}</h1>
      </div>

      <div className={classNames(cls.content, 'container')}>
        <Services />
        <AdditionalCartInfo />
      </div>
    </div>
  )
}

export default AdditionalServicePage