import SelectedIcon from '@/shared/assets/general/checked.svg?react'
import classNames from 'classnames';
import cls from './CheckBox.module.scss'
import { memo, ReactNode, HTMLProps } from 'react'

interface CheckedButtonProps extends Omit<HTMLProps<HTMLInputElement>, 'label'>{
  className?: string
  onClick?: () => void
  checked?: boolean
  label?: string | ReactNode
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
      {label}
    </label>
  )
})

CheckBox.displayName = 'CheckBox'