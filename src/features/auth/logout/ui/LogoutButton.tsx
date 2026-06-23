import { useTranslation } from 'react-i18next'
import { useState, useCallback } from 'react'
import { Button } from '@/shared/ui'
import { LogoutModal } from './LogoutModal.tsx'

interface LogoutButtonProps {
  className?: string
}

export const LogoutButton = ({ className }: LogoutButtonProps) => {
  const { t } = useTranslation('auth')
  const [isOpen, setIsOpen] = useState(false)

  const onOpen = useCallback(() => setIsOpen(true), [])
  const onClose = useCallback(() => setIsOpen(false), [])

  return (
    <>
      <Button className={className} dark onClick={onOpen}>
        {t('logout')}
      </Button>
      <LogoutModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}
