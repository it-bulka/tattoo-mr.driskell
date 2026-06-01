import cls from './CodConfirmModal.module.scss'
import { useTranslation } from 'react-i18next'
import { Modal, Button } from '@/shared/ui'

interface CodConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export const CodConfirmModal = ({ isOpen, onClose, onConfirm }: CodConfirmModalProps) => {
  const { t } = useTranslation('cart')

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={cls.content}>
        <h3 className={cls.title}>{t('payment.cod modal.title')}</h3>
        <p className={cls.body}>{t('payment.cod modal.body')}</p>
        <div className={cls.actions}>
          <Button dark center max big onClick={onConfirm}>
            {t('payment.cod modal.confirm')}
          </Button>
          <Button center max big onClick={onClose}>
            {t('payment.cod modal.cancel')}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
