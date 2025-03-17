import cls from './Profile.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '@/shared/ui'
import { CartForm } from '@/entities'
import { Histories } from './Histories/Histories.tsx'
import { PersonalManager } from './PersonalManager/PersonalManager.tsx'
import { PageTwoColumnLayout } from '@/shared/layouts'

const Profile = () => {
  const { t } = useTranslation()

  return (
    <PageTwoColumnLayout
      className={'pageSpacing'}
      left={(
        <>
          <Breadcrumbs className={cls.withContainer} />
          <h3 className={classNames("pageTitle", cls.withContainer)}>{t('profile')}</h3>
          <CartForm className={cls.withContainer} />
          <Histories className={classNames(cls.withContainer, cls.histories)}/>
        </>
      )}
      right={(
        <>
          <p className={cls.discount}>
            {t('personal discount')} <span className={cls.amount}>15%</span>
          </p>

          <PersonalManager />
        </>
      )}
    />
  )
}

export default Profile