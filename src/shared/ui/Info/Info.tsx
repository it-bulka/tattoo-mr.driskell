import cls from './Info.module.scss'
import classNames from 'classnames'
import QuestionMark from '@/shared/assets/general/question-mark.svg?react'
import { memo } from 'react'
import { useTransitionatedPosition } from './useTransitionatedPosition.tsx'

interface InfoProps {
  className?: string
  text: string
}
export const Info = memo(({
  className,
  text
}: InfoProps) => {
  const [position, refCallback] = useTransitionatedPosition()

  return (
    <div className={classNames(cls.info, {}, [className])}>
      <QuestionMark className={cls.icon}/>
      <p className={cls.popup} ref={refCallback} style={position}>{text}</p>
    </div>
  )
})

Info.displayName = 'Info'