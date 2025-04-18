import cls from './CartForm.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Input } from '@/shared/ui'
import { useMemo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useSubmit } from '../model/service/cartFormContext.tsx'
import { FieldConfig, CartFormData } from '../model/types/cartFormTypes.tsx'

interface CartFormProps {
  className?: string
}

export const CartForm = ({ className }: CartFormProps) => {
  const { t } = useTranslation()

  const {
    control,
    formState: { errors },
    clearErrors
  } = useFormContext<CartFormData>()
  const handleSubmit = useSubmit()

  const inputs = useMemo(() => {
    return {
      receiver: [
        { name: 'name', label: t('form.name'), placeholder: t('placeholder.name')},
        { name: 'phone', label: t('form.phone'), placeholder: '+380682635999'},
        { name: 'email', label: t('form.name'), placeholder: 'myemail@gmail.com'},
      ] satisfies FieldConfig<keyof Pick<CartFormData, 'name' | 'phone' | 'email'>>[],
      address: [
        { name: 'city', label: t('form.city'), placeholder: t('placeholder.city')},
        { name: 'street', label: t('form.street'), placeholder: t('placeholder.street')},
        { name: 'apartment', label: t('form.apartment'), placeholder: '25' },
        { name: 'entrance', label: t('form.entrance'), placeholder: '2' },
        { name: 'floor', label: t('form.floor'), placeholder: '6' },
        { name: 'entryphone', label: t('form.entryphone'), placeholder: '6565' },
      ] satisfies FieldConfig<keyof Pick<CartFormData, 'city' | 'street' | 'apartment' | 'entrance' | 'floor' | 'entryphone'>>[]
    }
  }, [t])

  return (
    <form className={classNames(cls.form, {}, [className])} onSubmit={handleSubmit}>
      <h3 className={cls.title}>01. {t('info about receiver')}</h3>
      <div className={cls.receiver}>
        {inputs.receiver.map((item) => (
          <Controller
            key={item.name}
            name={item.name}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={item.label}
                placeholder={item.placeholder}
                className={cls[item.name]}
                error={errors[item.name]?.message}
                onInput={() => clearErrors(item.name)}
              />
            )}
          />
        ))}
      </div>

      <h3 className={cls.title}>01. {t('info about address')}</h3>
      <div className={cls.address}>
        {inputs.address.map((item) => (
          <Controller
            key={item.name}
            name={item.name}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={item.label}
                placeholder={item.placeholder}
                className={cls[item.name]}
                error={errors[item.name]?.message}
                onInput={() => clearErrors(item.name)}
              />
            )}
          />
        ))}
      </div>
    </form>
  )
}