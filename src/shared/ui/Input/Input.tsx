import cls from './Input.module.scss'
import classNames from 'classnames'
import { HTMLProps, memo, ChangeEventHandler } from 'react'
import { ErrorMsg } from '@/shared/ui'

export interface InputProps extends Omit<HTMLProps<HTMLInputElement>, 'onChange' | 'size'>{
  className?: string
  label?: string
  inputClassName?: string
  error?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  size?: 'sm' | 'md'
}

const sizeToMap = {
  sm: cls.small,
  md: cls.normal
}

export const Input = memo(({
  className,
  label,
  inputClassName,
  error,
  size = 'md',
 ...rest
}: InputProps) => {
  return (
    <div className={classNames(cls.input, {}, [sizeToMap[size], className])}>
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