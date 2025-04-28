import cls from './Search.module.scss'
import classNames from 'classnames'
import { ChangeEvent, HTMLProps, memo, useRef } from 'react'
import SearchIcon from "@/shared/assets/general/search.svg?react"
import { LoaderCircle } from '@/shared/ui/Loaders'

type InputProps = Omit<HTMLProps<HTMLInputElement>, 'value' | 'onChange'>

interface SearchProps extends InputProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  isLoading?: boolean;
  withClearBtn?: boolean;
  onClear?: () => void;
}

export const Search = memo(({
  className,
  value,
  onChange,
  readOnly = false,
  placeholder,
  isLoading = false,
  withClearBtn,
  onClear,
  ...rest
}: SearchProps) => {
  const ref = useRef<HTMLInputElement | null>(null)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if(readOnly) return
    onChange?.(e.target.value)
  }

  const clearInput = () => {
    onChange?.('')
    onClear?.()

    if(ref.current) {
      ref.current.value = ''
    }
  }

  return (
    <div className={classNames(cls.search, {}, [className])}>
      {isLoading ? <LoaderCircle /> : <SearchIcon />}
      <input
        value={value}
        onChange={onChangeHandler}
        readOnly={readOnly}
        placeholder={placeholder}
        {...rest}
        ref={ref}
      />
      {withClearBtn && <button onClick={clearInput} className={cls.clearBtn}>&times;</button>}
    </div>
  )
})

Search.displayName = 'Search'