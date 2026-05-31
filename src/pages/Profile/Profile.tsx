import cls from './Profile.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Breadcrumbs } from '@/shared/ui'
import { Histories } from './Histories/Histories.tsx'
import { PersonalManager } from './PersonalManager/PersonalManager.tsx'
import { PageTwoColumnLayout } from '@/shared/layouts'
import { ProfileForm } from '@/features/ProfileForm'
import { getUserId, useGetUserQuery } from '@/entities/User'

const Profile = () => {
  const { t } = useTranslation()
  const userId = useSelector(getUserId)
  const { data: user, isLoading } = useGetUserQuery(userId!, { skip: !userId })

  return (
    <PageTwoColumnLayout
      className={'pageSpacing'}
      left={(
        <>
          <Breadcrumbs className={cls.withContainer} />
          <h3 className={classNames("pageTitle", cls.withContainer)}>{t('profile')}</h3>
          <ProfileForm />
          <Histories className={classNames(cls.withContainer, cls.histories)}/>
        </>
      )}
      right={(
        <>
          <p className={cls.discount}>
            {t('personal discount')}
            {' '}
            <span className={cls.amount}>
              {isLoading ? '—' : `${user?.discount ?? 0}%`}
            </span>
          </p>

          <PersonalManager />
        </>
      )}
    />
  )
}

export default Profile