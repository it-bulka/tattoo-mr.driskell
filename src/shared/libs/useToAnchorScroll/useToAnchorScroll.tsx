import { useEffect, useCallback, MouseEvent } from 'react'
import { useNavigate } from 'react-router'

/**
 * Custom hook that listens for hash changes in the URL and smoothly scrolls to the corresponding anchor element.
 *
 * This hook is meant to be used at the top level of your component tree to ensure it listens for
 * hash changes globally. It automatically triggers a smooth scroll to the element with the matching
 * ID when the hash in the URL changes.
 *
 * **Usage Recommendation:** It is recommended to use this hook at the top level of your application
 * (e.g., in the root component or layout) to manage anchor scrolling behavior across your site.
 *
 * @example
 * // Example of usage at the top level of your component
 * useToAnchorScroll();
 *
 * @returns {void}
 */
export const useToAnchorScrollGlobal = () => {
  useEffect(() => {
    const handleScrollToAnchor = () => {
      const hash = window.location.hash.slice(1); // Remove the '#' character from the hash
      if (hash) {
        const element = document.getElementById(hash);
        console.log('hash', hash)
        console.log('element', element)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }

    window.addEventListener('hashchange', handleScrollToAnchor)

    return () => window.removeEventListener('hashchange', handleScrollToAnchor)
  }, [])
}

export const useToAnchorScroll = (hash: unknown, activate: boolean) => {
  const navigate = useNavigate()
  const handleScrollToAnchor = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    if(typeof hash === 'string' && activate && hash.startsWith('#')) {
      e.preventDefault()

      const id = hash.slice(1) // remove "#"
      const element = document.getElementById(id)

      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        navigate(hash)
      }
    }

  }, [hash, activate, navigate])

  return activate ? handleScrollToAnchor : undefined
}