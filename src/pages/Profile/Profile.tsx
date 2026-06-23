import cls from './Profile.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Breadcrumbs } from '@/shared/ui'
import { Skeleton } from '@/shared/ui/Skeleton'
import { Histories } from './Histories/Histories.tsx'
import { PersonalManager } from './PersonalManager/PersonalManager.tsx'
import { PageTwoColumnLayout } from '@/shared/layouts'
import { ProfileEditForm } from '@/features/ProfileForm'
import { ChangePasswordForm } from '@/features/ChangePasswordForm'
import { LogoutButton } from '@/features/auth/logout'
import { getUserId, useGetUserQuery } from '@/entities/User'
import { useSeoMeta } from '@/shared/libs'

const Profile = () => {
  const { t } = useTranslation()
  const userId = useSelector(getUserId)
  const { data: user, isLoading } = useGetUserQuery(userId!, { skip: !userId })

  return (
    <PageTwoColumnLayout
      className={'pageSpacing'}
      left={(
        <>
          {useSeoMeta({ title: 'Профіль', noIndex: true })}
          <Breadcrumbs className={cls.withContainer} />
          <h1 className={classNames("pageTitle", cls.withContainer)}>{t('profile')}</h1>
          <ProfileEditForm className={cls.withContainer} />
          <ChangePasswordForm className={cls.withContainer} />
          <LogoutButton className={cls.withContainer} />
          <Histories className={classNames(cls.withContainer, cls.histories)}/>
        </>
      )}
      right={(
        <>
          <p className={cls.discount}>
            {t('personal discount')}
            {' '}
            <span className={cls.amount}>
              {isLoading
                ? <Skeleton height={22} width={48} border="4px" />
                : `${user?.discount ?? 0}%`
              }
            </span>
          </p>

          <PersonalManager />
        </>
      )}
    />
  )
}

export default Profile
