import cls from './ServiceCard.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
//import { Button } from '@/shared/ui'
import { memo, useState } from 'react'
import { Card } from '@/shared/ui';

export interface ServiceCardProps {
  className?: string
  img?: string
  title: string
  description: string
  price: number | string
  isSelected?: boolean
  onToggle?: () => void
}
export const ServiceCard = memo(({
  className,
  title,
  description,
  img,
  price,
  isSelected = false,
  onToggle,
}: ServiceCardProps) => {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)

  return (
    <Card
      title={title}
      btnTitle={isSelected ? t('remove from order') : t('add to order')}
      btnDark={isSelected}
      img={img}
      className={className}
      onBtnClick={onToggle}
    >
      <p className={classNames(cls.description, { [cls.expanded]: expanded }, [cls.clamp])}>{description}</p>
      <button className={cls.readMore} onClick={()=> setExpanded(prev => !prev)}>
        {expanded ? t('read less') : t('read more')}
      </button>
      <p className={cls.cost}>{t('service cost')} {price}</p>
    </Card>
  )
})