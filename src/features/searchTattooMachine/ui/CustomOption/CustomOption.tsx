import { OptionProps } from 'react-select'
import { Product } from '@/entities/ProductCard/ProductCard.tsx'
import cls from './CustomOption.module.scss'

export interface OptionType extends Product {}

export const CustomOption = (props: OptionProps<OptionType>) => {
  const { data, innerRef, innerProps, selectOption } = props;

  const handleClick = () => {
    selectOption(data)
  }

  return (
    <div ref={innerRef} {...innerProps} className={cls.option} onClick={handleClick}>
      <img src={data.images[0]} alt={data.title} className={cls.img} />
      <span>{data.title}</span>
    </div>
  )
}