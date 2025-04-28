import { useLocation } from 'react-router'
import { useEffect, useState, useCallback } from 'react'

export const useCheckPathnameChanging = () => {
  const { pathname } = useLocation()
  const [initialPath, setInitialPath] = useState<string | null>(null)
  const [isObservingPath, setIsObservingPath] = useState(true)

  useEffect(() => {
    if(pathname && !initialPath) {
      setInitialPath(pathname)
    }

    if(pathname && initialPath && pathname !== initialPath) {
      setIsObservingPath(false)
    }

  }, [setIsObservingPath, pathname, initialPath, setInitialPath])

  const startObservingCurrentPage = useCallback(() => {
    setInitialPath(pathname)
    setIsObservingPath(true)
  }, [setIsObservingPath])

  return {
    isObservingPath,
    startObservingCurrentPage
  }
}