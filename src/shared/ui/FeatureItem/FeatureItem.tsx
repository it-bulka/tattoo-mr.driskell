import cls from './FeatureItem.module.scss'
import classNames from 'classnames'
import { memo } from 'react'

interface FeatureItemProps {
  className?: string
  title: string
  decription?: string
}
export const FeatureItem = memo(({
  className,
  title,
  decription,
}: FeatureItemProps) => {
  return (
    <div className={classNames(cls.featureItem, {}, [className])}>
      <p className={cls.title}>{title}</p>
      <p className={cls.decription}>{decription}</p>
      <div className="decorator gray croppedPoligon full"/>
    </div>
  )
})

FeatureItem.displayName = 'FeatureItem'