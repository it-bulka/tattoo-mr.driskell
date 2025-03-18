import cls from './AppLink.module.scss'
import classNames from 'classnames'
import { NavLink, LinkProps } from 'react-router'
import { PropsWithChildren, memo } from 'react';
import { useToAnchorScroll } from '@/shared/libs';

export interface AppLinkProps extends LinkProps{
  className?: string
  anchorScroll?: boolean
}
export const AppLink = memo(({
  className,
  children,
  anchorScroll = false,
  to,
  ...rest
}: PropsWithChildren<AppLinkProps>) => {
  const anchorScrollHandle = useToAnchorScroll(to, anchorScroll)
  return (
    <NavLink
      className={classNames(cls.appLink, {}, [className])}
      to={to}
      {...rest}
      onClick={anchorScrollHandle}
    >
      {children}
    </NavLink>
  )
})

AppLink.displayName = 'AppLink'