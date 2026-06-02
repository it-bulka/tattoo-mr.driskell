import cls from './FilterModal.module.scss'
import { Modal, ModalProps, RadioButton, CheckBox, CloseBtn, RangeInput, Toggler, Accordion } from '@/shared/ui'
import { sortOptions, typeOptions, needleTypeOptions, Option, Sorts, FilterState } from '../../FilterToolbar/model/types.ts'
import { FilterHandlers } from '../../FilterToolbar/model/useProductFilters.ts'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { ProductCategory } from '@/entities/ProductList'

interface FiltersProps {
  className?: string
  sorts: Option<Sorts>[]
  category: ProductCategory
  filterState: FilterState
  handlers: FilterHandlers
  onClose?: () => void
}

const Filters = memo(({
  sorts,
  category,
  filterState,
  handlers,
  onClose,
}: FiltersProps) => {
  const { t } = useTranslation('catalog')

  const handleMotorTypeToggle = (value: typeof typeOptions[number]['value']) => {
    const next = filterState.motorTypes.includes(value)
      ? filterState.motorTypes.filter(v => v !== value)
      : [...filterState.motorTypes, value]
    handlers.handleMotorTypesChange(next)
  }

  const handleNeedleTypeToggle = (value: typeof needleTypeOptions[number]['value']) => {
    const next = filterState.needleTypes.includes(value)
      ? filterState.needleTypes.filter(v => v !== value)
      : [...filterState.needleTypes, value]
    handlers.handleNeedleTypesChange(next)
  }

  const showMotorTypes = category === 'tattoo-machines' || category === 'tattoo-sets'
  const showNeedleTypes = category === 'tattoo-needles'

  return (
    <div className={cls.content}>
      <div className={cls.header}>
        <p className={cls.title}>{t('filter')}</p>
        <CloseBtn onClick={onClose} />
      </div>

      <Accordion title={t('price')}>
        <>
          <RangeInput
            min={filterState.minPrice}
            max={filterState.maxPrice}
            onChangeMin={(val) => handlers.handlePriceChange(val, filterState.maxPrice)}
            onChangeMax={(val) => handlers.handlePriceChange(filterState.minPrice, val)}
          />
        </>
      </Accordion>
      <div className={classNames('decorator full static gray croppedPoligon', {}, [cls.decorator])} />

      <Accordion title={t('sort.title')}>
        <>
          {sorts.map((sort) => (
            <RadioButton
              key={sort.value}
              label={sort.label}
              value={sort.value}
              selectedValue={filterState.sort}
              onChange={(val) => handlers.handleSortChange(val as Sorts)}
              name="sort"
            />
          ))}
        </>
      </Accordion>
      <div className={classNames('decorator full static gray croppedPoligon', {}, [cls.decorator])} />

      {showMotorTypes && (
        <>
          <Accordion title={t('machine types.title')}>
            {typeOptions.map((opt) => (
              <CheckBox
                key={opt.value}
                label={t(opt.label)}
                checked={filterState.motorTypes.includes(opt.value)}
                onChange={() => handleMotorTypeToggle(opt.value)}
                name="motorType"
              />
            ))}
          </Accordion>
          <div className={classNames('decorator full static gray croppedPoligon', {}, [cls.decorator])} />
        </>
      )}

      {showNeedleTypes && (
        <>
          <Accordion title={t('needle types.title')}>
            {needleTypeOptions.map((opt) => (
              <CheckBox
                key={opt.value}
                label={t(opt.label)}
                checked={filterState.needleTypes.includes(opt.value)}
                onChange={() => handleNeedleTypeToggle(opt.value)}
                name="needleType"
              />
            ))}
          </Accordion>
          <div className={classNames('decorator full static gray croppedPoligon', {}, [cls.decorator])} />
        </>
      )}

      <Toggler
        label={t('available only')}
        name="available"
        isChecked={filterState.inStock}
        onChange={(e) => handlers.handleInStockChange((e.target as HTMLInputElement).checked)}
      />
      <div className={classNames('decorator full static gray croppedPoligon', {}, [cls.decorator])} />
    </div>
  )
})
Filters.displayName = 'Filters'

export type FilterModalProps = Omit<FiltersProps, 'onClose'> & ModalProps

export const FilterModal = memo(({
  isOpen,
  onClose,
  ...rest
}: FilterModalProps) => {
  return (
    <Modal position="top left" isOpen={isOpen} onClose={onClose}>
      {(closeModalHandler) => <Filters {...rest} onClose={closeModalHandler} />}
    </Modal>
  )
})

FilterModal.displayName = 'FilterModal'
