import cls from './Input.module.scss'
import classNames from 'classnames'
import { HTMLProps, memo } from 'react';

interface InputProps extends HTMLProps<HTMLInputElement>{
  className?: string
  label?: string
}

export const Input = memo(({
 className,
  label,
 ...rest
}: InputProps) => {
  return (
    <div className={classNames(cls.input, {}, [className])}>
      {label && <label className={cls.label}>{label}</label>}
      <input
        {...rest}
      />
    </div>
  )
})

Input.displayName = 'Input'