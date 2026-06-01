import { useState, useCallback, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { CartFormData } from '../types/cartFormTypes.tsx'
import { useSearchNPCitiesQuery, useGetNPWarehousesQuery } from '../api/novaPoshtaFormApi.ts'
import { useDebounce } from '@/shared/libs'

const POSTOMAT_TYPE_REF = 'f9316480-5f2d-425d-bc2c-ac7cd29decf0'

export function useNPAddress() {
  const { t } = useTranslation()
  const { control, setValue, watch, formState: { errors } } = useFormContext<CartFormData>()

  const npCityRef = watch('npCityRef') ?? ''
  const npDeliveryType = watch('npDeliveryType')

  const [cityInputValue, setCityInputValue] = useState('')
  const [debouncedCityQuery, setDebouncedCityQuery] = useState('')
  const updateDebouncedQuery = useDebounce(setDebouncedCityQuery, 300)

  const handleCityInputChange = useCallback(
    (inputValue: string, actionMeta: { action: string }) => {
      if (actionMeta.action === 'input-blur' || actionMeta.action === 'menu-close') return
      setCityInputValue(inputValue)
      updateDebouncedQuery(inputValue)
    },
    [updateDebouncedQuery],
  )

  const { data: cities = [], isFetching: isCitiesFetching } = useSearchNPCitiesQuery(
    debouncedCityQuery,
    { skip: debouncedCityQuery.length < 2 },
  )

  const warehouseTypeRef = npDeliveryType === 'postomat' ? POSTOMAT_TYPE_REF : undefined
  const warehouseSkip = !npCityRef || npDeliveryType === 'courier' || !npDeliveryType

  const { data: warehouses = [], isFetching: isWarehousesFetching } = useGetNPWarehousesQuery(
    { cityRef: npCityRef, typeRef: warehouseTypeRef },
    { skip: warehouseSkip },
  )

  const cityOptions = useMemo(
    () => cities.map((c) => ({ value: c.DeliveryCity, label: c.Present })),
    [cities],
  )

  const warehouseOptions = useMemo(
    () => warehouses.map((w) => ({ value: w.Ref, label: `№${w.Number} — ${w.Description}` })),
    [warehouses],
  )

  const npDeliveryTypeOptions = useMemo(
    () => [
      { value: 'warehouse', label: t('np_delivery_type.warehouse') },
      { value: 'postomat', label: t('np_delivery_type.postomat') },
      { value: 'courier', label: t('np_delivery_type.courier') },
    ],
    [t],
  )

  const showWarehouseSelect = npDeliveryType === 'warehouse' || npDeliveryType === 'postomat'

  return {
    control,
    setValue,
    errors,
    cityInputValue,
    setCityInputValue,
    handleCityInputChange,
    isCitiesFetching,
    cityOptions,
    npDeliveryTypeOptions,
    warehouseOptions,
    isWarehousesFetching,
    npCityRef,
    showWarehouseSelect,
  }
}
