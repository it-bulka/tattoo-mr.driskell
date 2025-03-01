import cls from './AppLink.module.scss'
import classNames from 'classnames'
import { NavLink, LinkProps } from 'react-router'
import { PropsWithChildren, memo } from 'react';

export interface AppLinkProps extends LinkProps{
  className?: string
}
export const AppLink = memo(({
  className,
  children,
  ...rest
}: PropsWithChildren<AppLinkProps>) => {

  return (
    <NavLink
      className={classNames(cls.appLink, {}, [className])}
      {...rest}
    >
      {children}
    </NavLink>
  )
})

AppLink.displayName = 'AppLink'