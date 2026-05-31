import cls from './Form.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Input } from '@/shared/ui'
import { FormEventHandler, useMemo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { FieldConfig, FormData } from '../model/type/formType.tsx'
import { memo } from 'react'

interface CartFormProps {
  className?: string
  handleSubmit: FormEventHandler | undefined
}

export const Form = memo(({ className, handleSubmit }: CartFormProps) => {
  const { t } = useTranslation()

  const {
    control,
    formState: { errors },
    clearErrors
  } = useFormContext<FormData>()

  const inputs = useMemo(() => {
    return {
      receiver: [
        { name: 'name', label: t('form.name'), placeholder: t('placeholder.name')},
        { name: 'phone', label: t('form.phone'), placeholder: '+380682635999'},
        { name: 'email', label: t('form.email'), placeholder: 'myemail@gmail.com'},
      ] satisfies FieldConfig<keyof Pick<FormData, 'name' | 'phone' | 'email'>>[],
      address: [
        { name: 'city', label: t('form.city'), placeholder: t('placeholder.city')},
        { name: 'street', label: t('form.street'), placeholder: t('placeholder.street')},
        { name: 'apartment', label: t('form.apartment'), placeholder: '25' },
        { name: 'entrance', label: t('form.entrance'), placeholder: '2' },
        { name: 'floor', label: t('form.floor'), placeholder: '6' },
        { name: 'doorphone', label: t('form.doorphone'), placeholder: '6565' },
      ] satisfies FieldConfig<keyof Pick<FormData, 'city' | 'street' | 'apartment' | 'entrance' | 'floor' | 'doorphone'>>[]
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
})