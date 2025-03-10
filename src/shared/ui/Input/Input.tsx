import cls from './Input.module.scss'
import classNames from 'classnames'
import { HTMLProps, memo } from 'react';

interface InputProps extends HTMLProps<HTMLInputElement>{
  className?: string
  label?: string
  inputClassName?: string
}

export const Input = memo(({
  className,
  label,
  inputClassName,
 ...rest
}: InputProps) => {
  return (
    <div className={classNames(cls.input, {}, [className])}>
      {label && <label className={cls.label}>{label}</label>}
      <input
        {...rest}
        className={inputClassName}
      />
    </div>
  )
})

Input.displayName = 'Input'