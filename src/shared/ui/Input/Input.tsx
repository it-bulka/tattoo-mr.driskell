import cls from './Input.module.scss'
import classNames from 'classnames'
import { HTMLProps, memo } from 'react'
import { ErrorMsg } from '@/shared/ui'

interface InputProps extends HTMLProps<HTMLInputElement>{
  className?: string
  label?: string
  inputClassName?: string
  error?: string
}

export const Input = memo(({
  className,
  label,
  inputClassName,
  error,
 ...rest
}: InputProps) => {
  return (
    <div className={classNames(cls.input, {}, [className])}>
      {label && <label className={cls.label}>{label}</label>}
      <input
        {...rest}
        className={classNames(inputClassName, { [cls.withErr]: error})}
      />
      <ErrorMsg text={error}/>
    </div>
  )
})

Input.displayName = 'Input'