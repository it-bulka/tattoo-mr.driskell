import { ResetPasswordModal } from '@/features/auth'
import { useSeoMeta } from '@/shared/libs'

const ResetPasswordPage = () => {
  return (
    <>
      {useSeoMeta({ title: 'Скидання пароля', noIndex: true })}
      <ResetPasswordModal />
    </>
  )
}

export default ResetPasswordPage
