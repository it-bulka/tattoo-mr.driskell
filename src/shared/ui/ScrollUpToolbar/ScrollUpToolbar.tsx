import cls from './ScrollUpToolbar.module.scss'
import classNames from 'classnames'
import { ScrollUpButton } from './ScrollUpButton/ScrollUpButton.tsx'
import { memo, useEffect, useState } from 'react'
import { useThrottle } from '@/shared/libs'

interface ScrollUpToolbarProps {
  className?: string
}
export const ScrollUpToolbar = memo(({ className }: ScrollUpToolbarProps) => {
  const [isShown, setShown] = useState(false)

  const checkScrollPercentage = useThrottle(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;

    const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;

    if(scrollPercent > 20) {
      setShown(true)
    } else {
      setShown(false)
    }
  })

  useEffect(() => {
    window.addEventListener('scroll', checkScrollPercentage)
    return () => window.removeEventListener('scroll', checkScrollPercentage)
  }, [])

  return (
    <div className={classNames('container', cls.toolbar, {}, [className])}>
      <ScrollUpButton className={classNames(cls.btn, {[cls.visible]: isShown})}/>
    </div>
  )
})