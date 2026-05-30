import { ErrorBoundary } from '@/shared/providers'
import { CartForm } from '@/features/CartForm/ui/CartForm.tsx'
import cls from '@/pages/Profile/Profile.module.scss'
import { CartFormProvider } from '@/features/CartForm'

export const ProfileForm = () => {
  return (
    <ErrorBoundary>
      <CartFormProvider>
        <CartForm className={cls.withContainer} />
      </CartFormProvider>
    </ErrorBoundary>
  )
}