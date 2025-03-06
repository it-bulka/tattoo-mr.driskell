import cls from './RangeInput.module.scss'
import classNames from 'classnames'
import { ChangeEvent, FocusEvent, useState } from 'react'

interface RangeInputProps {
  className?: string
  label?: string
  labelPosition?: 'left' | 'right'
  min?: number
  max?: number
  onChangeMin?: (value: number) => void
  onChangeMax?: (value: number) => void
  onError?: (err: Error) => void
}
export const RangeInput = ({
  className,
  label,
  labelPosition = 'left',
  min = 0,
  max = 0,
  onChangeMin,
  onChangeMax
}: RangeInputProps) => {

  const [minValue, setMinValue] = useState<string | number>(min)
  const [maxValue, setMaxValue] = useState<string | number>(max)

  const handleChangeMin = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    const numVal = Number(value)
    if(isNaN(numVal)) return
    setMinValue(value === "" ? "" : numVal)
    if (value !== "") onChangeMin?.(numVal)
  }

  const handleChangeMax = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    const numVal = Number(value)
    if(isNaN(numVal)) return
    setMaxValue(value === "" ? "" : numVal)
    if (value !== "") onChangeMax?.(numVal)
  }

  const handleBlurMin = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setMinValue(0)
      onChangeMin?.(0)
    }
  }

  const handleBlurMax = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setMaxValue(0)
      onChangeMax?.(0)
    }
  }

  return (
    <div className={classNames(cls.rangeWrapper, {}, [className])}>
      {label && labelPosition === 'left' && <p>{label}</p>}
      <div className={cls.range}>
        <input className={cls.input} value={minValue} onChange={handleChangeMin} onBlur={handleBlurMin}/>
        <span className={cls.divider}/>
        <input className={cls.input} value={maxValue} onChange={handleChangeMax} onBlur={handleBlurMax}/>
      </div>
      {label && labelPosition === 'right' && <p>{label}</p>}
    </div>
  )
}