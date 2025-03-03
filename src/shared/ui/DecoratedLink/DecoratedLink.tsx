import cls from './DecoratedLink.module.scss'
import classNames from 'classnames'
import { Link, LinkProps } from 'react-router'
import { PropsWithChildren } from 'react'

interface DecoratedLinkProps extends LinkProps{
  className?: string
}
export const DecoratedLink = ({
  className,
  to,
  children
}: PropsWithChildren<DecoratedLinkProps>) => {

  return (
    <div className={classNames(cls.decoratedLink, {}, [className])}>
      <Link to={to}>{children}</Link>
      <div className={classNames("decorator full", cls.decorator)}/>
    </div>
  )
}