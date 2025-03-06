import cls from './Toggler.module.scss'
import classNames from 'classnames'
import { HTMLProps } from 'react';

type InputType = Omit<HTMLProps<HTMLInputElement>, 'checked' | 'label'>
interface TogglerProps extends InputType{
  className?: string
  label?: string
  isChecked?: boolean
}
export const Toggler = ({
  className,
  isChecked,
  label,
  ...rest
}: TogglerProps) => {

  return (
    <label className={classNames(cls.togglerWrapper, {}, [className])}>
      {label && <span>{label}</span>}
      <input type="checkbox" checked={isChecked} {...rest} />
      <span className={cls.toggler} />
    </label>
  )
}