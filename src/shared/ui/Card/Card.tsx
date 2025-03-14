import cls from './Card.module.scss'
import classNames from 'classnames'
import { Button } from '@/shared/ui'
import { memo, PropsWithChildren } from 'react'

export interface ServiceCardProps {
  className?: string
  img: string
  title: string
  btnTitle: string,
  onBtnClick?: () => void,
}
export const Card = memo(({
   className,
   title,
   img,
   btnTitle,
   onBtnClick,
  children
}: PropsWithChildren<ServiceCardProps>) => {
  return (
    <div className={classNames(cls.card, {}, [className])}>
      <img src={img} alt={'Image of ' + title} className={cls.img}/>

      <div className={cls.content}>
        <p className={cls.title}>{title}</p>
        <div className={cls.body}>
          {children}
        </div>
        <Button big max onClick={onBtnClick}>{btnTitle}</Button>
      </div>
    </div>
  )
})

Card.displayName = 'Card'