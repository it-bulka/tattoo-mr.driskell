import { Modal } from '@/shared/ui'
import { Auth } from '@/features/auth/components'
import { useRegisterMutation } from '../../model/api/auth.tsx'
import { getRtkApiMessage } from '@/shared/libs'
import { RegistrationContent } from './RegistrationContent.tsx'
import { RegistrationSuccess } from './RegistrationSuccess.tsx'

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
}

export const RegistrationModal = ({ isOpen, onClose }: RegistrationModalProps) => {
  const [registration, { isLoading, isSuccess, error }] = useRegisterMutation()

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Auth.Content
        isLoading={isLoading}
        error={error && getRtkApiMessage(error)}
      >
        { !isSuccess
          ? <RegistrationContent onSubmit={registration}/>
          : <RegistrationSuccess />
        }
      </Auth.Content>
    </Modal>
  )
}