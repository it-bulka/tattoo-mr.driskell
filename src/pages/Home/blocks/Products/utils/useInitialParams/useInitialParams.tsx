import { useSearchParams } from 'react-router'
import { useMemo } from 'react'

export const useInitialParams = () => {
  const [searchParams] = useSearchParams()

  const initialParams = useMemo(() => {
    return Object.fromEntries(searchParams.entries())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return initialParams
}