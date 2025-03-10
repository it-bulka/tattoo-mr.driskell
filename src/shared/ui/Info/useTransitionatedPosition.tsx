import { CSSProperties, useCallback, useEffect, useState } from 'react';

type TransitionatedPosition = [position: CSSProperties, refCallback: (nodeRef: HTMLElement | null) => void]

/**
 * Type for the return value of the useTransitionatedPosition hook.
 *
 * @typedef {Array} TransitionatedPosition
 * @property {CSSProperties} position - The positioning styles for the element (e.g., left, width).
 * @property {(nodeRef: HTMLElement | null) => void} refCallback - A function to be passed as a ref to the element.
 */

/**
 * Hook for tracking the position of an element after the transition ends.
 * Prevent overlapping Info component over viewport
 *
 * It listens for the `transitionend` event to determine when the animation has completed,
 * and adjusts the position of the element if it overflows the window.
 *
 * @returns {TransitionatedPosition} An array containing:
 * - `position`: The CSSProperties object for positioning the element.
 * - `refCallback`: A function that accepts an HTML element as a ref.
 */

export const useTransitionatedPosition = (): TransitionatedPosition => {
  const [position, setPosition] = useState<CSSProperties>({})
  const [el, setEl] = useState<HTMLElement | null>(null)

  const onTransition = useCallback((e: TransitionEvent) => {
    if(!el || e.propertyName !== 'transform') return

    const { width, right } = el.getBoundingClientRect()
    const overflow = right - window.innerWidth;

    if(overflow < 0) return

    const offsetLeft = el.offsetLeft;
    const newLeft = offsetLeft - overflow

    if(width <= window.innerWidth) {
      setPosition({ left: `${newLeft}px`})
      return
    }

    if(width > window.innerWidth) {
      setPosition({ left: `${newLeft}px`, width: `${window.innerWidth}px`})
      return
    }

  }, [el, setPosition])

  const refCallback = useCallback((nodeRef: HTMLElement | null) => {
    if(nodeRef !== null) {
      setEl(nodeRef)
    }
  }, [setEl])

  useEffect(() => {
    if(!el) return
    el.addEventListener('transitionend', onTransition)

    return () => el.removeEventListener('transitionend', onTransition)
  }, [el, onTransition])


  return [position, refCallback]
}