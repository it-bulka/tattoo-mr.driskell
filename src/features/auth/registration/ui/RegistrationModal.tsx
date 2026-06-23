import { Modal } from "@/shared/ui";
import { Auth } from "@/features/auth/components";
import { useRegisterMutation } from "../../model/api/auth.tsx";
import { getRtkApiMessage } from "@/shared/libs";
import { RegistrationContent } from "./RegistrationContent.tsx";
import { RegistrationSuccess } from "./RegistrationSuccess.tsx";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
}

export const RegistrationModal = ({
  isOpen,
  onClose,
  onOpenLogin,
}: RegistrationModalProps) => {
  const [registration, { isLoading, isSuccess, error, reset }] =
    useRegisterMutation();

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <Auth.Content
        isLoading={isLoading}
        error={error && getRtkApiMessage(error)}
      >
        {!isSuccess ? (
          <RegistrationContent
            onSubmit={registration}
            onOpenLogin={onOpenLogin}
          />
        ) : (
          <RegistrationSuccess />
        )}
      </Auth.Content>
    </Modal>
  );
};
