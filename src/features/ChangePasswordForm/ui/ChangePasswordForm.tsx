import cls from './ChangePasswordForm.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-toastify'
import { Button, FormSection, FieldConfig } from '@/shared/ui'
import { getUserId, useUpdatePasswordMutation } from '@/entities/User'
import i18n from '@/shared/config/i18n/i18n.tsx'

const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, i18n.t('validation.enter_password')),
  newPassword: z.string().min(6, i18n.t('validation.password_min')),
  confirmNewPassword: z.string(),
}).refine(
  (data) => data.newPassword === data.confirmNewPassword,
  { message: i18n.t('validation.password_match'), path: ['confirmNewPassword'] }
)

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>

interface ChangePasswordFormProps {
  className?: string
}

export const ChangePasswordForm = ({ className }: ChangePasswordFormProps) => {
  const { t } = useTranslation()
  const userId = useSelector(getUserId)
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation()

  const methods = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { oldPassword: '', newPassword: '', confirmNewPassword: '' },
  })
  const { handleSubmit, reset, setError, formState: { errors } } = methods

  const onSubmit = async ({ oldPassword, newPassword }: ChangePasswordFormData) => {
    try {
      await updatePassword({ id: userId!, body: { oldPassword, newPassword } }).unwrap()
      toast.success(t('profileForm.password_changed'))
      reset()
    } catch (err) {
      const status = (err as { status?: number })?.status
      if (status === 400) {
        setError('oldPassword', { message: t('profileForm.wrong_password') })
      } else {
        setError('root', { message: t('profileForm.save_error') })
      }
    }
  }

  const fields = useMemo<FieldConfig<ChangePasswordFormData>[]>(() => [
    { name: 'oldPassword',        label: t('profileForm.old_password'),     placeholder: '••••••', type: 'password' },
    { name: 'newPassword',        label: t('profileForm.new_password'),     placeholder: '••••••', type: 'password' },
    { name: 'confirmNewPassword', label: t('profileForm.confirm_password'), placeholder: '••••••', type: 'password' },
  ], [t])

  return (
    <FormProvider {...methods}>
      <form
        className={classNames(cls.form, {}, [className])}
        onSubmit={handleSubmit(onSubmit)}
      >
        {errors.root && (
          <p className={cls.error}>{errors.root.message}</p>
        )}
        <FormSection<ChangePasswordFormData>
          title={t('profileForm.change_password')}
          titleClassName={cls.title}
          fields={fields}
          gridClassName={cls.fields}
        />
        <Button type="submit" disabled={isLoading} className={cls.submit}>
          {t('profileForm.change_password')}
        </Button>
      </form>
    </FormProvider>
  )
}
