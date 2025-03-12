import cls from './Tag.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

export type TagType = 'new' | 'hit' | 'promotion' | 'absent' | 'discount'
interface TagProps {
  className?: string
  type?: TagType
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