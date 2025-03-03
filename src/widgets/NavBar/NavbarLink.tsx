import { RefObject, useCallback, useRef, memo } from 'react';
import { AppLink } from '@/shared/ui';
import cls from '@/widgets/NavBar/NavBar.module.scss';
import { ElPositions, getElementPosition } from '@/shared/libs'

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
    if(!currentRef.current) return

    const { width, top, left } = getElementPosition(currentRef.current)
    setPosition({
      top,
      left,
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
