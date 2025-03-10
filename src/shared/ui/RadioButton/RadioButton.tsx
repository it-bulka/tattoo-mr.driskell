import cls from './RadioButton.module.scss'
import classNames from 'classnames'
import { HTMLProps, ReactNode, JSX, memo } from 'react'

type RadioType = Omit<HTMLProps<HTMLInputElement>, 'label' | 'onChange'>

interface RadioButtonProps<T extends string> extends RadioType {
  className?: string,
  label?: string | ReactNode,
  value: T,
  selectedValue: T,
  onChange: (value: T) => void,
}
const RadioButtonComponent = <T extends string>({
  className,
  name,
  label,
  value,
  selectedValue,
  onChange,
  ...rest
}: RadioButtonProps<T>) => {

  return (
    <label className={classNames(cls.radioButton, {[cls.active]: selectedValue === value}, [className])}>
      <input
        type="radio"
        name={name}
        {...rest}
        value={value}
        checked={selectedValue === value}
        onChange={() => onChange?.(value)}
      />
      <span className={cls.radio}/>
      {label}
    </label>
  )
}

export const RadioButton = memo(RadioButtonComponent) as <T extends string>(props: RadioButtonProps<T>) => JSX.Element

