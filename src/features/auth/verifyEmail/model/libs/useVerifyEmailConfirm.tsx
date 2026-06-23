import { useAppDispatch } from '@/app/providers/StoreProvider/config/store.ts';
import { useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';
import { verifyEmailThunk } from '../../../model/services/verifyEmailThunk.ts';

export const useVerifyEmailConfirm = () => {
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const token = searchParams.get('token')
    const email = searchParams.get('email')

    if (!token || !email) {
      setStatus('error')
      setError('Invalid verification link')
      return
    }

    dispatch(verifyEmailThunk({ verificationToken: token, email }))
      .unwrap()
      .then(() => setStatus('success'))
      .catch(() => {
        setStatus('error')
        setError('Verification failed')
      })
  }, [dispatch, searchParams])

  return { status, error }
}
