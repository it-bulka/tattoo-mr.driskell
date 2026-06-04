import { Modal, CheckBox, ErrorMsg } from '@/shared/ui'
import { Auth } from '@/features/auth/components'
import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getLoginSchema, LoginFormData } from '@/features/auth/model/types/login.ts'
import { useAppDispatch } from '@/app/providers/StoreProvider/config/store.ts'
import { loginThunk } from '@/features/auth/model/services/loginThunk.ts'
import { toast } from 'react-toastify'
import { memo } from 'react'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenRegister: () => void
  onOpenForgotPassword: () => void
}

export const LoginModal = memo(({ isOpen, onClose, onOpenRegister, onOpenForgotPassword }: LoginModalProps) => {
  const { t } = useTranslation('auth')
  const dispatch = useAppDispatch()

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
    clearErrors,
  } = useForm<LoginFormData>({
    defaultValues: { email: '', password: '', agree: false },
    resolver: zodResolver(getLoginSchema()),
  })

  const onSubmit = handleSubmit(async (data) => {
    const result = await dispatch(loginThunk(data))
    if (loginThunk.rejected.match(result)) {
      toast.error(t('invalid credentials'))
    } else {
      onClose()
    }
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Auth.Content>
        <form onSubmit={onSubmit}>
          <Auth.Title>{t('login')}</Auth.Title>

          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Auth.Input
                label={t('enter email')}
                error={errors.email?.message}
                onInput={() => clearErrors('email')}
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Auth.Input
                label={t('enter password')}
                type="password"
                error={errors.password?.message}
                onInput={() => clearErrors('password')}
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name="agree"
            render={({ field }) => (
              <CheckBox
                label={t('agree to the Terms of Service')}
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <ErrorMsg text={errors.agree?.message} />

          <Auth.Button disabled={isSubmitting}>{t('login')}</Auth.Button>
        </form>

        <button type="button" onClick={onOpenRegister}>{t('register account')}</button>
        <button type="button" onClick={onOpenForgotPassword}>{t('forgot password')}</button>
      </Auth.Content>
    </Modal>
  )
})

LoginModal.displayName = 'LoginModal'
