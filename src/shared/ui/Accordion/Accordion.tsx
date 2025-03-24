import cls from './Accordion.module.scss'
import classNames from 'classnames'
import ArrowLeft from '@/shared/assets/general/arrow-left.svg?react'
import { useState, memo, PropsWithChildren, useRef, useCallback } from 'react'

interface AccordionProps {
  className?: string
  title: string
  onClick?: () => void
  initialOpen?: boolean
}
export const Accordion = memo(({
  className,
  title,
  onClick,
  children,
  initialOpen = false
}: PropsWithChildren<AccordionProps>) => {
  const [isUp, setIsUp] = useState(initialOpen)
  const [isClosing, setIsClosing] = useState(false)
  const timerRef = useRef<number>(undefined)

  const closeHandle = useCallback(() => {
    setIsClosing(true)
    timerRef.current = setTimeout(() => {
      onClick?.()
      setIsUp(true)
      setIsClosing(false)
    }, 300)
  }, [setIsClosing, setIsUp])

  const openHandle = useCallback(() => {
    setIsUp(false)
  }, [setIsUp])

  const toggle = () => {
    if(isUp) {
      openHandle()
      return
    }

    closeHandle()
  }

  return (
    <div className={classNames('', {}, [className])}>
      <div className={cls.title}>
        <p>{title}</p>
        <button
          onClick={toggle}
          className={classNames(cls.arrow, { [cls.up]:  isUp })}>
          <ArrowLeft />
        </button>
      </div>

      <div className={classNames(cls.body)}>
        <div className={classNames(cls.inner, { [cls.closed]: isUp, [cls.isClosing]: isClosing })}>
          {children}
        </div>
      </div>
    </div>
  )
})

Accordion.displayName = 'Accordion'