import { useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { CartFormData } from '../types/cartFormTypes.tsx'
import { CART_FORM_LOCALSTORAGE } from '@/shared/consts/localStorages.tsx'
import { useDebounce } from '@/shared/libs'

export function useCartFormPersistence(methods: UseFormReturn<CartFormData>) {
  const { watch, reset } = methods

  useEffect(() => {
    const saved = localStorage.getItem(CART_FORM_LOCALSTORAGE)
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as CartFormData
        reset(parsed, { keepDefaultValues: false })
      } catch {
        localStorage.removeItem(CART_FORM_LOCALSTORAGE)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const debouncedSave = useDebounce((data: CartFormData) => {
    localStorage.setItem(CART_FORM_LOCALSTORAGE, JSON.stringify(data))
  }, 300)

  useEffect(() => {
    const subscription = watch((data) => {
      debouncedSave(data as CartFormData)
    })
    return () => subscription.unsubscribe()
  }, [watch, debouncedSave])
}
