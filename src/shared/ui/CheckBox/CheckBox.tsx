import SelectedIcon from '@/shared/assets/general/checked.svg?react'
import classNames from 'classnames';
import cls from './CheckBox.module.scss'
import { memo, ReactNode, HTMLAttributes, ChangeEvent } from 'react'

interface CheckedButtonProps extends Omit<HTMLAttributes<HTMLInputElement>, 'label'>{
  className?: string
  checked?: boolean
  label?: string | ReactNode
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}
export const CheckBox = memo(({
  className,
  onChange,
  checked,
  label,
  ...rest
}: CheckedButtonProps) => {
  return (
    <label
      className={classNames(cls.checkBox, { [cls.checked]: checked }, [className])}
      onClick={(e) => e.stopPropagation()}
    >
      <input {...rest} type='checkbox' checked={checked} onChange={onChange} />
      <span className={cls.icon}><SelectedIcon /></span>
      {label}
    </label>
  )
})

CheckBox.displayName = 'CheckBox'