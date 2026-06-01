import cls from './Textarea.module.scss'
import classNames from 'classnames'
import { HTMLProps, memo, ChangeEventHandler } from 'react'
import { ErrorMsg } from '@/shared/ui'

export interface TextareaProps extends Omit<HTMLProps<HTMLTextAreaElement>, 'onChange' | 'size'> {
  className?: string
  label?: string
  textareaClassName?: string
  error?: string
  onChange?: ChangeEventHandler<HTMLTextAreaElement>
  size?: 'sm' | 'md'
}

const sizeToMap = {
  sm: cls.small,
  md: cls.normal,
}

export const Textarea = memo(({
  className,
  label,
  textareaClassName,
  error,
  size = 'md',
  ...rest
}: TextareaProps) => {
  return (
    <div className={classNames(cls.input, {}, [sizeToMap[size], className])}>
      {label && <label className={cls.label}>{label}</label>}
      <textarea
        {...rest}
        className={classNames(textareaClassName, { [cls.withErr]: error })}
      />
      <ErrorMsg text={error} />
    </div>
  )
})

Textarea.displayName = 'Textarea'
