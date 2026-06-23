import { useTranslation } from 'react-i18next'
import { useState, useCallback, memo } from 'react'
import { Button } from '@/shared/ui'
import { DeleteAccountModal } from './DeleteAccountModal.tsx'

interface DeleteAccountButtonProps {
  className?: string
}

export const DeleteAccountButton = memo(({ className }: DeleteAccountButtonProps) => {
  const { t } = useTranslation('auth')
  const [isOpen, setIsOpen] = useState(false)

  const onOpen = useCallback(() => setIsOpen(true), [])
  const onClose = useCallback(() => setIsOpen(false), [])

  return (
    <>
      <Button className={className} onClick={onOpen}>
        {t('delete account')}
      </Button>
      {isOpen && <DeleteAccountModal isOpen onClose={onClose} />}
    </>
  )
})

DeleteAccountButton.displayName = 'DeleteAccountButton'
