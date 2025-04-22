import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

export const useHandleCopy = () => {
  const { t } = useTranslation()
  return useCallback((textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast.info(t('copied'))
    })
  }, [t])
}