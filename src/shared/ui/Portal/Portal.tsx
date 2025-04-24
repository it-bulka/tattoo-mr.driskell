import { PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'
import { ensurePortalRoot } from './ensurePortalRoot.tsx'

interface PortalProps {
  element?: HTMLElement;
}
export const Portal = ({ children, element }: PropsWithChildren<PortalProps>) => {
  const elToInsert = element || ensurePortalRoot()
  return createPortal(children, elToInsert)
}
