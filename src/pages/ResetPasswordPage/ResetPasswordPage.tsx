import { ResetPasswordModal } from '@/features/auth'
import { SeoMeta } from '@/shared/libs'

const ResetPasswordPage = () => {
  return (
    <>
      <SeoMeta title="Скидання пароля" noIndex />
      <ResetPasswordModal />
    </>
  )
}

export default ResetPasswordPage
