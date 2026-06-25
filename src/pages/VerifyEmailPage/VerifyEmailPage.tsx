import { VerifyEmailModal } from '@/features/auth'
import { SeoMeta } from '@/shared/libs'

const VerifyEmailPage = () => {
  return (
    <>
      <SeoMeta title="Підтвердження email" noIndex />
      <VerifyEmailModal />
    </>
  )
}

export default VerifyEmailPage
