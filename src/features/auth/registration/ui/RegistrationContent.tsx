import { getRegistrationSchema, RegistrationFormData } from '../../model/types/registration.ts'
import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Auth } from '../../components/index.tsx'
import { CheckBox, ErrorMsg } from '@/shared/ui'
import { memo } from 'react'

const registrationInputs = [
  { name: 'name', label: 'enter name' },
  { name: 'email', label: 'enter email' },
  { name: 'password', label: 'enter password' },
  { name: 'confirmPassword', label: 'confirm password' },
] as const

interface RegistrationContentProps {
  onSubmit: (data: RegistrationFormData) => void
  onOpenLogin: () => void
}

export const RegistrationContent = memo(({ onSubmit, onOpenLogin }: RegistrationContentProps) => {
  const { t } = useTranslation('auth')

  const {
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
  } = useForm({
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
      agree: false
    },
    resolver: zodResolver(getRegistrationSchema()),
  })

  const submitHandler = handleSubmit((data: RegistrationFormData) => {
    onSubmit(data)
  })

  return (
    <>
      <form onSubmit={submitHandler}>
        <Auth.Title>{t('registration')}</Auth.Title>
        {registrationInputs.map(({name, label}) => (
          <Controller
            key={name}
            control={control}
            name={name}
            render={({ field }) => (
              <Auth.Input
                label={t(label)}
                {...field}
                error={errors[name]?.message}
                onInput={() => clearErrors(name)}
              />
            )}
          />
        ))}

        <Controller
          control={control}
          name="agree"
          render={({ field }) => (
            <CheckBox
              label={t('agree to the Terms of Service')}
              {...field}
            />
          )}
        />
        <ErrorMsg text={errors['agree']?.message} />

        <Auth.Button>{t('confirm')}</Auth.Button>
      </form>
      <button type="button" onClick={onOpenLogin}>{t('already have account')}</button>
    </>
  )
})

RegistrationContent.displayName = 'RegistrationContent'