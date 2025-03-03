import cls from './Search.module.scss'
import classNames from 'classnames'
import { ChangeEvent, HTMLProps, memo } from 'react'
import SearchIcon from "@/shared/assets/general/search.svg?react"

type InputProps = Omit<HTMLProps<HTMLInputElement>, 'value' | 'onChange'>

interface SearchProps extends InputProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}
export const Search = memo(({
  className,
  value,
  onChange,
  readOnly = false,
  placeholder,
  ...rest
}: SearchProps) => {

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if(readOnly) return
    onChange?.(e.target.value)
  }

  return (
    <div className={classNames(cls.search, {}, [className])}>
      <SearchIcon />
      <input
        value={value}
        onChange={onChangeHandler}
        readOnly={readOnly}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  )
})

Search.displayName = 'Search'