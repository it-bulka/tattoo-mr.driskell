import cls from './Card.module.scss'
import classNames from 'classnames'
import { Button } from '@/shared/ui'
import { memo, PropsWithChildren } from 'react'

export interface ServiceCardProps {
  className?: string
  img?: string
  imgFallback?: string
  title: string
  btnTitle: string
  btnDark?: boolean
  onBtnClick?: () => void
}
export const Card = memo(({
   className,
   title,
   img,
   imgFallback,
   btnTitle,
   btnDark,
   onBtnClick,
  children
}: PropsWithChildren<ServiceCardProps>) => {
  return (
    <div className={classNames(cls.card, {}, [className])}>
      {img && (
        <img
          src={img}
          alt={'Image of ' + title}
          className={cls.img}
          onError={imgFallback ? (e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = imgFallback
          } : undefined}
        />
      )}

      <div className={cls.content}>
        <p className={cls.title}>{title}</p>
        <div className={cls.body}>
          {children}
        </div>
        <Button big max dark={btnDark} onClick={onBtnClick}>{btnTitle}</Button>
      </div>
    </div>
  )
})

Card.displayName = 'Card'