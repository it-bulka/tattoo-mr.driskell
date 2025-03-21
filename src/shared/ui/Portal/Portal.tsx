import { PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  element?: HTMLElement;
}
export const Portal = ({ children, element = document.body }: PropsWithChildren<PortalProps>) => {
  return createPortal(children, element)
}
