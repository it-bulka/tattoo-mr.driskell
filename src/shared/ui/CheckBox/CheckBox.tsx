import SelectedIcon from '@/shared/assets/general/checked.svg?react'
import classNames from 'classnames';
import cls from './CheckBox.module.scss'
import { memo, HTMLAttributes } from 'react'

interface CheckedButtonProps extends HTMLAttributes<HTMLInputElement> {
  className?: string
  onClick?: () => void
  checked?: boolean
  label?: string
}
export const CheckBox = memo(({
  className,
  onClick,
  checked,
  label,
  ...rest
}: CheckedButtonProps) => {
  return (
    <label
      className={classNames(cls.checkBox, { [cls.checked]: checked }, [className])}
      onClick={onClick}
    >
      <input type='checkbox' checked={checked} onChange={onClick} {...rest}/>
      <span className={cls.icon}><SelectedIcon /></span>
      {label && <span>{label}</span>}
    </label>
  )
})

CheckBox.displayName = 'CheckBox'