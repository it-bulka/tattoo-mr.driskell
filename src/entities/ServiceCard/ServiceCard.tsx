import cls from './ServiceCard.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui'
import { memo, useState } from 'react'

export interface ServiceCardProps {
  className?: string
  img: string
  title: string
  description: string
  price: number | string
}
export const ServiceCard = memo(({
  className,
  title,
  description,
  img,
  price
}: ServiceCardProps) => {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={classNames(cls.serviceCard, {}, [className])}>
      <img src={img} alt={'Image of ' + title} className={cls.img}/>

      <div className={cls.content}>
        <p className={cls.title}>{title}</p>
        <div className={cls.descriptionWrapper}>
          <p className={classNames(cls.description, { [cls.expanded]: expanded }, [cls.clamp])}>{description}</p>
          <button className={cls.readMore} onClick={()=> setExpanded(prev => !prev)}>
            {expanded ? t('read less') : t('read more')}
          </button>
        </div>
        <p className={cls.cost}>{t('service cost')} {price}</p>
        <Button big max>{t('add to order')}</Button>
      </div>
    </div>
  )
})