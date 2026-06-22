import cls from './Select.module.scss'
import classNames from 'classnames'
import { memo } from 'react'
import Select, { components, DropdownIndicatorProps, StylesConfig, Props as SelectProps } from 'react-select'
import { useId } from 'react'
import { getVars } from './libs/getVars/getVars.tsx'

type OptionType = {
  value: string
  label: string
}

const { fontColor } = getVars()

const getCustomStyles = (isMulti: boolean): StylesConfig<OptionType, boolean> => {
  return {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: '#ffffff',
      border: `1px solid ${state.isFocused ? '#BB8C5F' : '#e5ddd2'}`,
      borderRadius: '14px',
      fontWeight: 900,
      color: fontColor,
      minWidth: '186px',
      minHeight: '56px',
      padding: '0 0 0 20px',
      boxShadow: state.isFocused ? '0 0 0 1px #BB8C5F' : 'none',
      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      "&:hover": {
        borderColor: '#BB8C5F',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#BB8C5F' : state.isFocused ? '#faf7f2' : '#ffffff',
      color: state.isSelected ? '#ffffff' : fontColor,
      padding: '12px 20px',
      transition: 'background-color 0.2s ease',
      cursor: 'pointer',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: fontColor,
      padding: '0',
      margin: '0',
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: '0',
      margin: '0',
      color: fontColor,
    }),
    menu: (provided) => ({
      ...provided,
      marginTop: '4px',
      borderRadius: '14px',
      boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
      overflow: 'hidden',
      padding: '0',
    }),
    menuList: (provided) => ({
      ...provided,
      boxShadow: 'none',
      padding: '8px 0',
      backgroundColor: '#ffffff',
      borderRadius: '14px',
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      padding: '0 12px 0',
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),

    ...(isMulti ? {} : {})
  }
}


const DropdownIndicator = (props: DropdownIndicatorProps<OptionType, boolean>) => {
  return (
    <components.DropdownIndicator {...props}>
     <div className={cls.indicator}/>
    </components.DropdownIndicator>
  )
}

type SelectType = Omit<SelectProps<OptionType>, 'options' | 'styles' | 'isMulti'>
interface CustomSelectProps extends  SelectType{
  className?: string
  options: OptionType[]
  label: string
  isMulti?: boolean
}

export const CustomSelect = memo(({
  className,
  options,
  label,
  isMulti = false,
  ...rest
}: CustomSelectProps) => {
  const id = useId()
  return (
    <div className={classNames(cls.select, {}, [className])}>
      <label htmlFor={id}>{label}</label>
      <Select<OptionType, boolean>
        {...rest}
        id={id}
        options={options}
        components={{
          DropdownIndicator
        }}
        styles={getCustomStyles(isMulti)}
        placeholder={label}
        isMulti={isMulti}
      />
    </div>
  )
})

CustomSelect.displayName = 'CustomSelect'