import { PropsWithChildren, createContext, useCallback, useContext, FormEventHandler, useEffect, useMemo } from 'react'
import { useForm, FormProvider, DefaultValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CartFormSchema, CartFormData } from '../types/cartFormTypes.tsx'
import { makeOrder } from '@/entities/Order'
import { useAppDispatch } from '@/app/providers/StoreProvider/config/store.ts'
import { useSelector } from 'react-redux'
import { getOrderDeliverySelector } from '@/entities'
import { useCartFormPersistence } from '../hooks/useCartFormPersistence.ts'
import { submitWayForPayForm } from '@/shared/libs'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const CART_FORM_DEFAULTS: DefaultValues<CartFormData> = {
  name: '',
  phone: '',
  email: '',
  deliveryMethod: 'courier',
  city: '',
  street: '',
  apartment: '',
  entrance: '',
  floor: '',
  doorphone: '',
  comment: '',
  npCityRef: '',
  npCityName: '',
  npDeliveryType: undefined,
  npWarehouseRef: '',
  npWarehouseName: '',
  agree: false,
}

const SubmitContext = createContext<FormEventHandler | undefined>(undefined)

export const CartFormProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch()
  const delivery = useSelector(getOrderDeliverySelector)
  const { t } = useTranslation('cart')

  const methods = useForm<CartFormData>({
    resolver: zodResolver(CartFormSchema),
    mode: 'onBlur',
    defaultValues: { ...CART_FORM_DEFAULTS, deliveryMethod: delivery },
  })

  useEffect(() => {
    methods.setValue('deliveryMethod', delivery, { shouldValidate: false })
  }, [delivery, methods])

  useCartFormPersistence(methods)

  const onSubmit = useCallback(async (data: CartFormData) => {
    const result = await dispatch(makeOrder(data))

    if (makeOrder.rejected.match(result)) {
      const message = result.payload || t('order.error')
      toast.error(message)
      return
    }

    if (makeOrder.fulfilled.match(result) && result.payload.paymentData) {
      submitWayForPayForm(result.payload.paymentData)
    }
  }, [dispatch, t])

  const handleSubmitForm = useMemo(
    () => methods.handleSubmit(onSubmit),
    [methods, onSubmit],
  )

  return (
    <FormProvider {...methods}>
      <SubmitContext.Provider value={handleSubmitForm}>
        {children}
      </SubmitContext.Provider>
    </FormProvider>
  )
}

export const useSubmit = () => {
  const submitHandler = useContext(SubmitContext)
  return submitHandler
}
