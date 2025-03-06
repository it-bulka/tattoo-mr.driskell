import { useRef, useCallback } from 'react'

export const useThrottle = (cb: (...args: unknown[]) => void, delay: number = 500) => {
  const throttleRef = useRef<boolean>(false)
  const timeoutId = useRef<number| null>(null)

  const throttleCb = useCallback((...args: unknown[]) => {
    if(throttleRef.current) return

    cb(...args)
    throttleRef.current = true

    if(timeoutId.current) {
      clearTimeout(timeoutId.current)
    }

    timeoutId.current = setTimeout(() => {
      throttleRef.current = false
    }, delay)
  }, [cb, delay])

  return throttleCb
}