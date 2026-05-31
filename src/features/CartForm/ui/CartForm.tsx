import cls from './CartForm.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormSection, FieldConfig } from '@/shared/ui'
import { useSubmit } from '../model/service/cartFormContext.tsx'
import { CartFormData } from '../model/types/cartFormTypes.tsx'

interface CartFormProps {
  className?: string
}

export const CartForm = ({ className }: CartFormProps) => {
  const { t } = useTranslation()
  useFormContext<CartFormData>()
  const handleSubmit = useSubmit()

  const receiverFields = useMemo<FieldConfig<CartFormData>[]>(() => [
    { name: 'name',  label: t('form.name'),  placeholder: t('placeholder.name'), className: cls.name },
    { name: 'phone', label: t('form.phone'), placeholder: '+380682635999',        className: cls.phone },
    { name: 'email', label: t('form.email'), placeholder: 'myemail@gmail.com',    className: cls.email },
  ], [t])

  const addressFields = useMemo<FieldConfig<CartFormData>[]>(() => [
    { name: 'city',      label: t('form.city'),      placeholder: t('placeholder.city'),   className: cls.city },
    { name: 'street',    label: t('form.street'),    placeholder: t('placeholder.street'), className: cls.street },
    { name: 'apartment', label: t('form.apartment'), placeholder: '25',                    className: cls.apartment },
    { name: 'entrance',  label: t('form.entrance'),  placeholder: '2',                     className: cls.entrance },
    { name: 'floor',     label: t('form.floor'),     placeholder: '6',                     className: cls.floor },
    { name: 'doorphone', label: t('form.doorphone'), placeholder: '6565',                  className: cls.doorphone },
  ], [t])

  return (
    <form className={classNames(cls.form, {}, [className])} onSubmit={handleSubmit}>
      <FormSection<CartFormData>
        title={`01. ${t('info about receiver')}`}
        titleClassName={cls.title}
        fields={receiverFields}
        gridClassName={cls.receiver}
      />
      <FormSection<CartFormData>
        title={`01. ${t('info about address')}`}
        titleClassName={cls.title}
        fields={addressFields}
        gridClassName={cls.address}
      />
    </form>
  )
}
