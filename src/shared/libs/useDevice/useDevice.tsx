import { useState, useEffect } from 'react'

export const useDevice = (size: number = 768) => {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth <= size
      setIsMobile(isSmallScreen)
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [size])

  return isMobile
}
