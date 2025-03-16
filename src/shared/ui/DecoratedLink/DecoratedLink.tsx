import cls from './DecoratedLink.module.scss'
import classNames from 'classnames'
import { Link, LinkProps } from 'react-router'
import { PropsWithChildren, HTMLAttributes, ReactNode, useMemo } from 'react'

interface DecoratedLinkProps extends LinkProps{
  type?: 'link'
}

interface DecoratedBtnProps extends HTMLAttributes<HTMLButtonElement> {
  type: 'button'
}

type DecoratedProps = {
  className?: string
} & (DecoratedBtnProps | DecoratedLinkProps)

export const DecoratedLink = ({
  className,
  type = 'link',
  children,
  ...restProps
}: PropsWithChildren<DecoratedProps>) => {
  const content = useMemo(() => {
    let innerContent: ReactNode;

    if(type === 'link') {

      const { to, ...props } = restProps as DecoratedLinkProps
      innerContent = <Link to={to} {...props}>{children}</Link>

    } else if (type === 'button') {

      const props = restProps as DecoratedBtnProps
      innerContent = <button {...props}>{children}</button>
    }

    return innerContent
  }, [type])

  return (
    <div className={classNames(cls.decoratedLink, {}, [className])}>
      {content}
      <div className={classNames("decorator full", cls.decorator)}/>
    </div>
  )
}
