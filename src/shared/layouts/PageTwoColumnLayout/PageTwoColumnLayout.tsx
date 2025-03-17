import cls from './PageTwoColumnLayout.module.scss'
import classNames from 'classnames'
import { memo, ReactNode } from 'react'

interface PageTwoColumnLayoutProps {
  className?: string
  left: ReactNode
  right: ReactNode
}
export const PageTwoColumnLayout = memo(({
  className,
  left,
  right
}: PageTwoColumnLayoutProps) => {
  return (
    <div className={classNames(cls.pageTwoColumnLayout, {}, [className])}>
      <div className={cls.left}>{left}</div>
      <div className={cls.right}>{right}</div>
    </div>
  )
})

PageTwoColumnLayout.displayName = 'PageTwoColumnLayout'