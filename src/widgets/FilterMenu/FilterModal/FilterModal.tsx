import cls from './FilterModal.module.scss'
import {
  Modal, ModalProps, RadioButton, CheckBox, CloseBtn, RangeInput, Toggler
} from '@/shared/ui'
import { Sorts, Types, Option } from '../../FilterToolbar/model/types.ts'
import { useCallback, useState, memo } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames';
import { Accordion } from '@/shared/ui'

export interface FiltersProps {
  className?: string
  sorts: Option<Sorts>[]
  types: Option<Types>[]
  onClose?: () => void
}

const Filters = memo(({
  sorts,
  types,
  onClose
}: FiltersProps) => {
  const { t } = useTranslation('catalog')
  const [sortsSelected, setSortSelected] = useState<Sorts>(sorts[0].value)
  const [typesSelected, setTypesSelected] = useState<Partial<Record<Types, undefined>>>({})
  const [range, setRange] = useState({ min: 0, max: 4400 })

  const handleCheckBoxes = useCallback((value: Types) => {
    const removeKey = (key: Types) => {
      setTypesSelected(({ [key]: _, ...rest }) => rest)
    }

    const addKey = (key: Types) => {
      setTypesSelected(prev => ({ ...prev, [key]:  undefined}))
    }

    if (typesSelected[value]) {
      removeKey(value)
    } else {
      addKey(value)
    }
  }, [setTypesSelected, typesSelected])

  return (
    <div className={cls.content}>
      <div className={cls.header}>
        <p className={cls.title}>{t('filter')}</p>
        <CloseBtn onClick={onClose} />
      </div>

      <Accordion title={t('price')}>
        <>
          <RangeInput
            min={range.min}
            max={range.max}
            onChangeMin={(val) => setRange(prev => ({ ...prev, min: val }))}
            onChangeMax={(val) => setRange(prev => ({ ...prev, max: val }))}
          />
        </>
      </Accordion>
      <div className={classNames("decorator full static gray croppedPoligon", {}, [cls.decorator])}/>


      <Accordion title={t('sort.title')}>
        <>
          {sorts.map((sort) => (
            <RadioButton
              label={sort.label}
              value={sort.value}
              selectedValue={sortsSelected}
              onChange={setSortSelected}
              name="sort"
            />
          ))}
        </>
      </Accordion>
      <div className={classNames("decorator full static gray croppedPoligon", {}, [cls.decorator])}/>

      <Accordion title={t('machine types.title')}>
        {types.map((type) => (
          <CheckBox
            label={type.label}
            checked={typesSelected[type.value]}
            onChange={() => handleCheckBoxes(type.value)}
            name="types"
          />
        ))}
      </Accordion>
      <div className={classNames("decorator full static gray croppedPoligon", {}, [cls.decorator])}/>

      <Toggler label={t('available only')} name="available" />
      <div className={classNames("decorator full static gray croppedPoligon", {}, [cls.decorator])}/>

    </div>
  )
})
Filters.displayName = 'Filters'

export type FilterModalProps = FiltersProps & ModalProps

export const FilterModal = memo(({
  isOpen,
  onClose,
  ...rest
}: FilterModalProps) => {
  return (
    <Modal position="top left" isOpen={isOpen} onClose={onClose}>
      {(closeModalHandler) => <Filters {...rest} onClose={closeModalHandler}/>}
    </Modal>
  )
})

FilterModal.displayName = 'FilterModal'