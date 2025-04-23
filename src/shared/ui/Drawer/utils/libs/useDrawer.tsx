import { useState, useCallback } from 'react'

export const useDrawer = (initState: boolean = false) => {
  const [isOpen, setIsOpen] = useState(initState)

  const closeDrawer = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const openDrawer = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  const toggleDrawer = useCallback(() => {
    setIsOpen(prevState => !prevState)
  }, [setIsOpen])

  return {
    isDrawerOpen: isOpen,
    closeDrawer,
    openDrawer,
    toggleDrawer
  }
}