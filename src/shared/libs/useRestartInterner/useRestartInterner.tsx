import { useEffect } from 'react'
import { useManualCartSync } from '@/entities/Cart'

export const useRestartInternet = () => {
  const handleCartSync = useManualCartSync()

  useEffect(() => {
    const handleOnline = () => {
      handleCartSync()
    }

    const handleOffline = () => {
      console.log('NO interner')
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, []);
}