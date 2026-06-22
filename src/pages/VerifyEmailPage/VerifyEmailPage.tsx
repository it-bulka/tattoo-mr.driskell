import { VerifyEmailModal } from '@/features/auth'
import { useSeoMeta } from '@/shared/libs'

const VerifyEmailPage = () => {
  return (
    <>
      {useSeoMeta({ title: 'Підтвердження email', noIndex: true })}
      <VerifyEmailModal />
    </>
  )
}

export default VerifyEmailPage
