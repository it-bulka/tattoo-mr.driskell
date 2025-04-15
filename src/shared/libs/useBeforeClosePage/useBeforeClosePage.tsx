import { useEffect } from 'react'
import { useSyncCartWithServerBeforeClose } from '@/entities/Cart'

export const useBeforeClosePage = () => {
  const handleSyncCart = useSyncCartWithServerBeforeClose()

  useEffect(() => {
    const handleClosePage = async (event: BeforeUnloadEvent) => {
      handleSyncCart()

      event.preventDefault()
      event.returnValue = ''
    }

    window.addEventListener('beforeunload', handleClosePage)
    return () => window.removeEventListener('beforeunload', handleClosePage)
  }, [handleSyncCart]);
}