import cls from './Select.module.scss'
import classNames from 'classnames'
import { memo } from 'react'
import Select, { components, StylesConfig, Props as SelectProps } from 'react-select'
import { useId } from 'react'
import { getVars } from './libs/getVars/getVars.tsx'

type OptionType = {
  value: string
  label: string
}

const {
  primaryColor,
  fontColor
} = getVars()

const getCustomStyles = (isMulti: boolean): StylesConfig<OptionType, boolean> => {
  return {
    // select border
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? primaryColor : primaryColor,
      border: 'none',
      borderColor: 'transparent',
      borderRadius: '0',
      fontWeight: 900,
      color: fontColor,
      minWidth: '186px',
      padding: '12px 0 12px 20px',
      "&:hover": {
        borderColor: "none",
        boxShadow: 'none',
      },
    }),
    // select option
    option: (provided) => ({
      ...provided,
      backgroundColor: primaryColor,
      color: fontColor,
      padding: '10px 0'
    }),
    // chosen in select
    singleValue: (provided) => ({
      ...provided,
      backgroundColor: primaryColor,
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
    // options wrapper
    menu: (provided) => ({
      ...provided,
      marginTop: '0',
      borderRadius: '0',
      boxShadow: 'none',
      padding: '0'
    }),
    menuList: (provided) => ({
      ...provided,
      boxShadow: 'none',
      padding: '0 20px 10px',
      backgroundColor: primaryColor
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


const DropdownIndicator = (props: any) => {
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
  console.log('default', rest.defaultValue)
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