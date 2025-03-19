import cls from './NavBar.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx'
import { useState,  CSSProperties, useMemo, memo } from 'react';
import { NavbarLink } from './NavbarLink.tsx'
import { ElPositions } from '@/shared/libs'

interface NavBarProps {
  className?: string
}

export const navLinks = [
  {
    name: 'promo codes',
    href: RoutePaths.promo_codes
  },
  {
    name: 'discounts',
    href: RoutePaths.discounts
  },
  {
    name: 'help',
    href: RoutePaths.help
  },
  {
    name: 'about',
    href: RoutePaths.about
  },
  {
    name: 'contact',
    href: RoutePaths.contacts
  }
]

export const NavBar = memo(({ className }: NavBarProps) => {
  const { t } = useTranslation()
  const [elPosition, setElPosition] = useState<ElPositions | null>(null);

  const cursorPosition = useMemo((): CSSProperties => {
    if (!elPosition) return {opacity: 0}

    const { top, left, width } = elPosition
    const centerX = left + width / 2;

    return {left: `${centerX}px`, top: `${top}px`}
  }, [elPosition])


  return (
    <nav
      className={classNames(cls.navBar, {}, [className])}
      onMouseLeave={() => setElPosition(null)}
    >
      {navLinks.map(({name, href}) => (
        <NavbarLink href={href} text={t(name)} key={href} setPosition={setElPosition} />
      ))}
      <div className="decorator vertical withTransition" style={cursorPosition}/>
    </nav>
  )
})

NavBar.displayName = 'NavBar'