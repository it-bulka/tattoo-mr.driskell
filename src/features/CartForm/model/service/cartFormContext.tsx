import { PropsWithChildren, createContext, useCallback, useContext, FormEventHandler } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CartFormSchema, CartFormData } from '../types/cartFormTypes.tsx'
import { makeOrder } from '@/entities/Order'
import { useAppDispatch } from '@/app/providers/StoreProvider/config/store.ts'

const SubmitContext = createContext<FormEventHandler | undefined>(undefined)

export const CartFormProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch()
  const methods = useForm<CartFormData>({
    resolver: zodResolver(CartFormSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      city: '',
      street: '',
      apartment: '',
      entrance: '',
      floor: '',
      entryphone: ''
    }
  })

  const onSubmit = useCallback((data: CartFormData) => {
    console.log('Form submitted', data);
    dispatch(makeOrder(data))
  }, [dispatch])

  const handleSubmitForm = methods.handleSubmit(onSubmit)

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