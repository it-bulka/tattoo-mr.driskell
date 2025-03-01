import { RefObject, useCallback, useRef, memo } from 'react';
import { AppLink } from '@/shared/ui';
import cls from '@/widgets/NavBar/NavBar.module.scss';

export type ElPositions = Record<'top' | 'left' | 'width', number>
interface ILink {
  href: string
  text: string
  setPosition: (props: ElPositions) => void
}

export const NavbarLink = memo(({
  href,
  text,
  setPosition
}: ILink) => {
  const ref = useRef<HTMLLIElement>(null)

  const onMouseEnter = useCallback((currentRef: RefObject<HTMLLIElement | null>)=> () => {
    console.log('onMouseEnter', currentRef.current)
    if(!currentRef.current) return

    const { width } = currentRef.current.getBoundingClientRect()
    setPosition({
      top: currentRef.current.offsetTop + currentRef.current.offsetHeight,
      left: currentRef.current.offsetLeft,
      width
    })
  }, [setPosition])

  return (
    <li
      ref={ref}
      onMouseEnter={onMouseEnter(ref)}
    >
      <AppLink
        to={href}
        className={cls.link}
      >
        {text}
      </AppLink>
    </li>
  )
})

NavbarLink.displayName = 'NavBarLink'
