import cls from './CounterInput.module.scss'
import classNames from 'classnames'
import { useRef, ChangeEvent, FocusEvent, useCallback, memo } from 'react'

export interface CounterInputProps {
  className?: string
  initialValue?: number
  onChange?: (value: number) => void,
  min?: number
}
export const CounterInput = memo(({
  className,
  initialValue = 0,
  onChange,
  min = 0
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
    if(minusValue < min) return
    inputRef.current!.value = minusValue.toString()
    onChange?.(minusValue)
  }, [onChange, min])

  const onPlusClick = useCallback(() => {
    if (!inputRef.current) return null;
    const numValue = getValidNumber(inputRef.current.value)
    if(numValue === null) return
    const plusValue = numValue + 1
    inputRef.current!.value = plusValue.toString()
    onChange?.(plusValue)
  }, [onChange])

  const onBlur = useCallback((e: FocusEvent<HTMLInputElement>) => {
    const targetValue = e.target.value.trim()
    if(inputRef.current && (targetValue === "" || Number(targetValue) < min)) {
      inputRef.current.value = String(min)
      onChange?.(min)
    }
  }, [onChange, min])

  const onResizeInput = useCallback((value: string, ref: HTMLInputElement) => {
    const style = getComputedStyle(ref)
    const paddingLeft = parseFloat(style.paddingLeft);
    const paddingRight = parseFloat(style.paddingRight);
    const borderLeft = parseFloat(style.borderLeftWidth);
    const borderRight = parseFloat(style.borderRightWidth);
    const width = value.length; // for ch

    const newWidth = `calc(${width}ch + ${paddingLeft + paddingRight + borderLeft + borderRight}px)`;

    ref.style.width = newWidth;
  }, [])

  const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!inputRef.current) return;
    let value = e.target.value.replace(/[^0-9]/g, '')

    inputRef.current.value = value
    onChange?.(Number(value))
    onResizeInput(value, inputRef.current)
  }, [onChange, onResizeInput, min])


  return (
    <div className={classNames(cls.counter, {}, [className])} onClick={(e) => e.stopPropagation()}>
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

CounterInput.displayName = 'CounterInput'