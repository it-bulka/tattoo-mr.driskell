import cls from './Tag.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

interface TagProps {
  className?: string
  type?: 'new' | 'hit' | 'promotion' | 'absent' | 'discount'
}
export const Tag = ({
  className,
  type = 'new',
}: TagProps) => {
  const { t } = useTranslation('tags')

  return (
    <span className={classNames(cls.tag, {}, [className, cls[type]])}>
      {t(type)}
    </span>
  )
}