import cls from './InfoLabel.module.scss'
import classNames from 'classnames'
import { Info } from '../Info/Info.tsx'

interface InfoLabelProps {
  className?: string
  label: string
  info: string
}
export const InfoLabel = ({
  className,
  label,
  info,
}: InfoLabelProps) => {
  return (
    <span className={classNames(cls.infoLabel, {}, [className])}>
      {label}
      <Info text={info} />
    </span>
  )
}
