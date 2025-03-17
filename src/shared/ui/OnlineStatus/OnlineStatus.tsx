import cls from './OnlineStatus.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { memo } from 'react'


export type Status = 'online' | 'offline'
interface OnlineStatusProps {
  className?: string
  status: Status
}

export const OnlineStatus = memo(({
  className,
  status
}: OnlineStatusProps) => {
  const { t } = useTranslation()

  return (
    <p className={classNames(cls.onlineStatus, {}, [className])}>
      <span className={cls[status]} />
      {t(status)}
    </p>
  )
})

OnlineStatus.displayName = 'OnlineStatus'