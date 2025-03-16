import cls from './Profile.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '@/shared/ui'
import { OrderHistory } from '@/widgets'

interface ProfileProps {
  className?: string
}
const Profile = ({ className }: ProfileProps) => {
  const { t } = useTranslation()

  return (
    <div className={classNames(cls.Profile, {}, [className, 'container', 'pageSpacing'])}>
      <div>
        <Breadcrumbs />
        <h3 className="pageTitle">{t('profile')}</h3>
      </div>
      <div>

        <div>
          <OrderHistory />
        </div>
      </div>
    </div>
  )
}

export default Profile