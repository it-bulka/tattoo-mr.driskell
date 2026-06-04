import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { CheckBox } from '@/shared/ui/CheckBox/CheckBox';
import { ErrorMsg } from '@/shared/ui/ErrorMsg';
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { getSubscribeFormSchema, SubscribeFormData } from './model/subscribeFormSchema'
import cls from './FormBlock.module.scss'

export const Form = () => {
  const { t } = useTranslation()
  const { handleSubmit, control, formState: { isValid, errors } } = useForm<SubscribeFormData>({
    defaultValues: {
      email: '',
      name: '',
      agree: false
    },
    resolver: zodResolver(getSubscribeFormSchema()),
    mode: 'onChange'
  })

  const onSubmit = handleSubmit(() => {
    toast.success(t('form.subscription_success'))
  })

  return (
    <form onSubmit={onSubmit} className={cls.form}>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <Input label={t('form.email')} placeholder="john@gmail.com" {...field} error={errors.email?.message} className={cls.input}/>
        )}
      />
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <Input label={t('form.name')} placeholder={t('form.enter your name')} {...field} error={errors.name?.message} className={cls.input}/>
        )}
      />

      <Controller
        control={control}
        name="agree"
        render={({ field }) => (
          <>
            <CheckBox
              label={t('form.agree to process personal data')}
              {...field}
              className={cls.checkbox}
            />
            <ErrorMsg text={errors.agree?.message} />
          </>
        )}
      />

      <Button dark big withMargin disabled={!isValid} className={cls.btn}>{t('form.subscribe btn')}</Button>
    </form>
  )
}