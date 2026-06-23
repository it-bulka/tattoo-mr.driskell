import { Modal } from '@/shared/ui'
import { Auth } from '@/features/auth/components'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { useAppDispatch } from '@/app/providers/StoreProvider/config/store.ts'
import { deleteAccountThunk } from '../../model/services/deleteAccountThunk.ts'
import { getHomePage } from '@/shared/config/routeConfig/routeConfig.tsx'
import { useState, useCallback, memo } from 'react'
import cls from './DeleteAccountModal.module.scss'

interface DeleteAccountModalProps {
  isOpen: boolean
  onClose: () => void
}

export const DeleteAccountModal = memo(({ isOpen, onClose }: DeleteAccountModalProps) => {
  const { t } = useTranslation('auth')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = useCallback(async () => {
    setIsLoading(true)
    await dispatch(deleteAccountThunk())
    onClose()
    navigate(getHomePage(), { replace: true })
  }, [dispatch, onClose, navigate])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Auth.Content>
        <div className={cls.wrap}>
          <Auth.Title>{t('delete account title')}</Auth.Title>
          <p>{t('delete account confirm')}</p>
          <div className={cls.actions}>
            <Auth.Button onClick={handleDelete} disabled={isLoading}>
              {t('delete account')}
            </Auth.Button>
            <button type="button" className={cls.cancel} onClick={onClose}>
              {t('cancel')}
            </button>
          </div>
        </div>
      </Auth.Content>
    </Modal>
  )
})

DeleteAccountModal.displayName = 'DeleteAccountModal'
