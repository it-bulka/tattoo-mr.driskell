import cls from './ProfileEditForm.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useEffect, useMemo } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-toastify'
import { Button, FormSection, FieldConfig } from '@/shared/ui'
import { getUserId, useGetUserQuery, useUpdateUserMutation } from '@/entities/User'
import i18n from '@/shared/config/i18n/i18n.tsx'

const profileEditSchema = z.object({
  name: z.string().min(3, i18n.t('validation.enter_name')).max(50),
  phone: z.string().optional().default(''),
  email: z.string().email(i18n.t('validation.invalid_email')),
  city: z.string().optional().default(''),
  street: z.string().optional().default(''),
  apartment: z.string().optional().default(''),
  entrance: z.string().optional().default(''),
  floor: z.string().optional().default(''),
  doorphone: z.string().optional().default(''),
})

type ProfileEditFormData = z.infer<typeof profileEditSchema>

interface ProfileEditFormProps {
  className?: string
}

export const ProfileEditForm = ({ className }: ProfileEditFormProps) => {
  const { t } = useTranslation()
  const userId = useSelector(getUserId)
  const { data: user } = useGetUserQuery(userId!, { skip: !userId })
  const [updateUser, { isLoading }] = useUpdateUserMutation()

  const methods = useForm<ProfileEditFormData>({
    resolver: zodResolver(profileEditSchema),
    defaultValues: {
      name: '', phone: '', email: '',
      city: '', street: '', apartment: '', entrance: '', floor: '', doorphone: '',
    },
  })
  const { handleSubmit, reset, setError, formState: { isDirty } } = methods

  useEffect(() => {
    if (user) reset({
      name: user.name ?? '',
      email: user.email ?? '',
      phone: user.phone ?? '',
      city: user.city ?? '',
      street: user.street ?? '',
      apartment: user.apartment ?? '',
      entrance: user.entrance ?? '',
      floor: user.floor ?? '',
      doorphone: user.doorphone ?? '',
    })
  }, [user, reset])

  const onSubmit = async (data: ProfileEditFormData) => {
    try {
      await updateUser({ id: userId!, body: data }).unwrap()
      toast.success(t('profileForm.saved'))
    } catch (err) {
      const apiErr = err as { data?: { field?: string; message?: string } }
      if (apiErr?.data?.field === 'email') {
        setError('email', { message: apiErr.data?.message })
      } else {
        toast.error(t('profileForm.save_error'))
      }
    }
  }

  const receiverFields = useMemo<FieldConfig<ProfileEditFormData>[]>(() => [
    { name: 'name',  label: t('form.name'),  placeholder: t('placeholder.name'), className: cls.name },
    { name: 'phone', label: t('form.phone'), placeholder: '+380682635999',        className: cls.phone },
    { name: 'email', label: t('form.email'), placeholder: 'myemail@gmail.com',    className: cls.email },
  ], [t])

  const addressFields = useMemo<FieldConfig<ProfileEditFormData>[]>(() => [
    { name: 'city',      label: t('form.city'),      placeholder: t('placeholder.city'),   className: cls.city },
    { name: 'street',    label: t('form.street'),    placeholder: t('placeholder.street'), className: cls.street },
    { name: 'apartment', label: t('form.apartment'), placeholder: '25',                    className: cls.apartment },
    { name: 'entrance',  label: t('form.entrance'),  placeholder: '2',                     className: cls.entrance },
    { name: 'floor',     label: t('form.floor'),     placeholder: '6',                     className: cls.floor },
    { name: 'doorphone', label: t('form.doorphone'), placeholder: '6565',                  className: cls.doorphone },
  ], [t])

  return (
    <FormProvider {...methods}>
      <form
        className={classNames(cls.form, {}, [className])}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormSection<ProfileEditFormData>
          title={`01. ${t('info about receiver')}`}
          titleClassName={cls.title}
          fields={receiverFields}
          gridClassName={cls.receiver}
        />
        <FormSection<ProfileEditFormData>
          title={`01. ${t('info about address')}`}
          titleClassName={cls.title}
          fields={addressFields}
          gridClassName={cls.address}
        />
        <Button
          type="submit"
          disabled={!isDirty || isLoading}
          className={cls.submit}
        >
          {t('profileForm.save')}
        </Button>
      </form>
    </FormProvider>
  )
}
