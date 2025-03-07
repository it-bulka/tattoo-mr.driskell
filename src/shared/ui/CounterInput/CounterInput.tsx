import cls from './CounterInput.module.scss'
import classNames from 'classnames'
import { useRef, ChangeEvent, FocusEvent, useCallback, memo } from 'react'

interface CounterInputProps {
  className?: string
  initialValue?: number
  onChange?: (value: number) => void
}
export const CounterInput = memo(({
  className,
  initialValue = 0,
  onChange
}: CounterInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const getValidNumber = useCallback((val: string): number | null => {
    const value = val.trim();
    const numValue = Number(value);
    if (isNaN(numValue)) return null;
    return numValue;
  }, [])

  const onMinusClick = useCallback(() => {
    if (!inputRef.current) return null;
    const numValue = getValidNumber(inputRef.current.value)
    if(numValue === null) return

    const minusValue = numValue - 1
    if(minusValue < 0) return
    inputRef.current!.value = minusValue.toString()
    onChange?.(minusValue)
  }, [onChange])

  const onPlusClick = useCallback(() => {
    if (!inputRef.current) return null;
    const numValue = getValidNumber(inputRef.current.value)
    if(numValue === null) return
    const plusValue = numValue + 1
    inputRef.current!.value = plusValue.toString()
    onChange?.(plusValue)
  }, [onChange])

  const onBlur = useCallback((e: FocusEvent<HTMLInputElement>) => {
    if(inputRef.current && e.target.value.trim() === "") {
      inputRef.current.value = '0'
      onChange?.(0)
    }
  }, [onChange])

  const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!inputRef.current) return;
    const value = e.target.value.replace(/[^0-9]/g, '')
    inputRef.current.value = value
    onChange?.(Number(value))
  }, [onChange])

  return (
    <div className={classNames(cls.counter, {}, [className])}>
      <button onClick={onMinusClick}>-</button>
      <input
        ref={inputRef}
        className={cls.input}
        defaultValue={initialValue}
        onBlur={onBlur}
        onChange={onInputChange}
      />
      <button onClick={onPlusClick}>+</button>
    </div>
  )
},
  (prevProps, nextProps) => {
    return prevProps.onChange === nextProps.onChange && prevProps.className === nextProps.className;
  })