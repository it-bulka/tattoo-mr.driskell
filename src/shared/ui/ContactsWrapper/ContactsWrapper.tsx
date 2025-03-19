import cls from './ContactsWrapper.module.scss'
import classNames from 'classnames'
import { PropsWithChildren, memo } from 'react'

export type ContactWrapperGap = 'none' | 's'

interface ContactsWrapperProps {
  className?: string
  gap?: ContactWrapperGap
  inline?: boolean
}

const gapMap = {
  'none': 'space-none',
  's': 'space-s',
}

export const ContactsWrapper = memo(({
  className,
  children,
  gap = 'none',
  inline = false
}: PropsWithChildren<ContactsWrapperProps>) => {
  return (
    <div className={classNames(cls.contacts, { [cls.inline]: inline}, [className, cls[gapMap[gap]]])}>
      {children}
    </div>
  )
})