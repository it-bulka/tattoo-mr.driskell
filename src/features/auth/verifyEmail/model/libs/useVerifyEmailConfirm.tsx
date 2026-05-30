import { useAppDispatch } from '@/app/providers/StoreProvider/config/store.ts';
import { useSearchParams } from 'react-router';
import { useCallback } from 'react';
import { verifyEmailThunk } from '../../../model/services/verifyEmailThunk.ts';

export const useVerifyEmailConfirm = () => {
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()

  const onConfirm = useCallback(() => {
    const token = searchParams.get('token')
    const email = searchParams.get('email')

    dispatch(verifyEmailThunk({ verificationToken: token, email }))
  }, [dispatch, searchParams])

  return onConfirm
}