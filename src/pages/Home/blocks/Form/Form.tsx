import { useTranslation } from 'react-i18next'
import { Button, Input, CheckBox } from '@/shared/ui';
import { useForm, Controller } from 'react-hook-form'
import cls from './FormBlock.module.scss'

export const Form = () => {
  const { t } = useTranslation()
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: '',
      name: '',
      agree:  false
    }
  })

  const onSubmit = handleSubmit((data) => {
    // TODO: connect to redux
    console.log("data", data)
  })

  return (
    <form onSubmit={onSubmit} className={cls.form}>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <Input label={t('form.email')} placeholder="john@gmail.com" {...field} className={cls.input}/>
        )}
      />
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <Input label={t('form.name')} placeholder={t('form.enter your name')} {...field} className={cls.input}/>
        )}
      />

      <Controller
        control={control}
        name="agree"
        render={({ field }) => (
          <CheckBox
            label={t('form.agree to process personal data')}
            {...field}
            className={cls.checkbox}
          />
        )}
      />


      <Button dark big>{t('form.subscribe btn')}</Button>
    </form>
  )
}