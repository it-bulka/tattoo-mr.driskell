import { useState, useEffect } from 'react'

export const useDevice = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = () => {
      const isCoarse = window.matchMedia('(pointer: coarse)').matches
      const isSmallScreen = window.innerWidth <= 768
      setIsMobile(isCoarse && isSmallScreen)
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile
}
