import { useEffect } from 'react'

export const updateContentWidthVar = () => {
  const widthWithoutScrollbar = document.documentElement.clientWidth;
  document.documentElement.style.setProperty('--content-width', `${widthWithoutScrollbar}px`);
};

export const useUpdateContentWidth = (update: boolean) => {
  useEffect(() => {
    if (update) {
      updateContentWidthVar()
    }

    window.addEventListener('resize', updateContentWidthVar)

    return () => window.removeEventListener('resize', updateContentWidthVar)
  }, [update])
}