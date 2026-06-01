import { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useFormContext } from 'react-hook-form'
import { getOrderPaymentSelector } from '@/entities/Order'
import { useSubmit, type CartFormData } from '@/features/CartForm'

export const useCheckoutSubmit = () => {
  const selectedPaymentType = useSelector(getOrderPaymentSelector)
  const { trigger } = useFormContext<CartFormData>()
  const submitHandler = useSubmit()
  const [isCodModalOpen, setIsCodModalOpen] = useState(false)

  const isCod = selectedPaymentType === 'cashOnDelivery'

  const handleMainButtonClick = useCallback(async () => {
    if (isCod) {
      const isValid = await trigger()
      if (isValid) setIsCodModalOpen(true)
    } else {
      submitHandler?.()
    }
  }, [isCod, trigger, submitHandler])

  const handleCodConfirm = useCallback(() => {
    setIsCodModalOpen(false)
    submitHandler?.()
  }, [submitHandler])

  return {
    isCod,
    isCodModalOpen,
    closeCodModal: () => setIsCodModalOpen(false),
    handleMainButtonClick,
    handleCodConfirm,
  }
}
