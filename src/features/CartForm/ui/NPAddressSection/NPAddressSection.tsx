import cls from './NPAddressSection.module.scss'
import classNames from 'classnames'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { CustomSelect, ErrorMsg } from '@/shared/ui'
import { useNPAddress } from '../../model/hooks/useNPAddress.ts'

interface NPAddressSectionProps {
  className?: string
  title?: string
  titleClassName?: string
}

const portalProps = {
  menuPortalTarget: typeof document !== 'undefined' ? document.body : undefined,
  menuPosition: 'fixed' as const,
  className: cls.select,
}

export const NPAddressSection = ({ className, title, titleClassName }: NPAddressSectionProps) => {
  const { t } = useTranslation()
  const {
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
  } = useNPAddress()

  return (
    <div className={className}>
      {title && <h3 className={classNames(cls.title, titleClassName)}>{title}</h3>}
      <div className={cls.grid}>

        <div className={cls.city}>
          <Controller
            name="npCityRef"
            control={control}
            render={({ field }) => (
              <CustomSelect
                {...portalProps}
                label={t('form.np_city')}
                options={cityOptions}
                isLoading={isCitiesFetching}
                inputValue={cityInputValue}
                filterOption={() => true}
                noOptionsMessage={() =>
                  cityInputValue.length < 2
                    ? t('placeholder.np_city_search')
                    : t('nothing is found')
                }
                value={cityOptions.find((o) => o.value === field.value) ?? null}
                onInputChange={handleCityInputChange}
                onChange={(option) => {
                  const opt = option as { value: string; label: string } | null
                  setCityInputValue('')
                  field.onChange(opt?.value ?? '')
                  setValue('npCityName', opt?.label ?? '', { shouldValidate: false })
                  setValue('npWarehouseRef', '', { shouldValidate: false })
                  setValue('npWarehouseName', '', { shouldValidate: false })
                }}
              />
            )}
          />
          <ErrorMsg text={errors.npCityRef?.message} />
        </div>

        <div className={cls.deliveryType}>
          <Controller
            name="npDeliveryType"
            control={control}
            render={({ field }) => (
              <CustomSelect
                {...portalProps}
                label={t('form.np_delivery_type')}
                options={npDeliveryTypeOptions}
                value={npDeliveryTypeOptions.find((o) => o.value === field.value) ?? null}
                onChange={(option) => {
                  const opt = option as { value: string; label: string } | null
                  field.onChange(opt?.value ?? undefined)
                  setValue('npWarehouseRef', '', { shouldValidate: false })
                  setValue('npWarehouseName', '', { shouldValidate: false })
                }}
              />
            )}
          />
          <ErrorMsg text={errors.npDeliveryType?.message} />
        </div>

        {showWarehouseSelect && (
          <div className={cls.warehouse}>
            <Controller
              name="npWarehouseRef"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...portalProps}
                  label={t('form.np_warehouse')}
                  options={warehouseOptions}
                  isLoading={isWarehousesFetching}
                  isDisabled={!npCityRef}
                  noOptionsMessage={() =>
                    !npCityRef ? t('placeholder.np_city_search') : t('nothing is found')
                  }
                  value={warehouseOptions.find((o) => o.value === field.value) ?? null}
                  onChange={(option) => {
                    const opt = option as { value: string; label: string } | null
                    field.onChange(opt?.value ?? '')
                    setValue('npWarehouseName', opt?.label ?? '', { shouldValidate: false })
                  }}
                />
              )}
            />
            <ErrorMsg text={errors.npWarehouseRef?.message} />
          </div>
        )}

      </div>
    </div>
  )
}
