import cls from './ScrollUpToolbar.module.scss'
import classNames from 'classnames'
import { ScrollUpButton } from './ScrollUpButton/ScrollUpButton.tsx'
import { memo, useEffect, useState } from 'react'
import { useDevice, useThrottle } from '@/shared/libs'
import { useLocation } from 'react-router';

interface ScrollUpToolbarProps {
  className?: string
}
export const ScrollUpToolbar = memo(({ className }: ScrollUpToolbarProps) => {
  const [isShown, setShown] = useState(false)
  const [isEnoughTall, setEnoughTall] = useState(false)
  const isMobile = useDevice()
  const { pathname } = useLocation();

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
    if (!isEnoughTall) {
      setShown(false);
      return;
    }

    window.addEventListener('scroll', checkScrollPercentage, {
      passive: true,
    })
    return () => window.removeEventListener('scroll', checkScrollPercentage)
  }, [isEnoughTall])

  useEffect(()=> {
    const checkHeight = () => {
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;

      setEnoughTall(docHeight >= winHeight * 1.6);
    };

    checkHeight();
  }, [pathname])

  return (
    <div className={classNames('container', cls.toolbar, {}, [className])}>
      <ScrollUpButton
        className={classNames(cls.btn, {[cls.visible]: isShown })}
        btnOnly={isMobile}
      />
    </div>
  )
})