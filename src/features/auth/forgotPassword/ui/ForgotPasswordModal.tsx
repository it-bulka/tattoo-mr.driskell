import { Modal } from '@/shared/ui'
import { Auth } from '@/features/auth/components'
import { useSendForgotPasswordEmailMutation } from '@/features/auth/model/api/auth.tsx'
import { getRtkApiMessage } from '@/shared/libs'
import { ForgotPasswordContent } from './ForgotPasswordContent.tsx'
import { ForgotPasswordSuccess } from './ForgotPasswordSuccess.tsx'

interface ForgotPasswordModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenLogin: () => void
  onOpenRegister: () => void
}

export const ForgotPasswordModal = ({
  isOpen,
  onClose,
  onOpenLogin,
  onOpenRegister,
}: ForgotPasswordModalProps) => {
  const [sendEmail, { isLoading, isSuccess, error, reset }] = useSendForgotPasswordEmailMutation()

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <Auth.Content isLoading={isLoading} error={error ? getRtkApiMessage(error) : undefined}>
        {!isSuccess
          ? (
            <ForgotPasswordContent
              onSubmit={sendEmail}
              onOpenLogin={onOpenLogin}
              onOpenRegister={onOpenRegister}
              isSubmitting={isLoading}
            />
          )
          : <ForgotPasswordSuccess onOpenLogin={onOpenLogin} />
        }
      </Auth.Content>
    </Modal>
  )
}
