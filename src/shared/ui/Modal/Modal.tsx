import cls from './Modal.module.scss'
import classNames from 'classnames'
import { Portal } from '../Portal/Portal.tsx'
import { Overlay } from '../Overlay/Overlay.tsx'
import { useModal } from '@/shared/libs/useModal/useModal.tsx'
import { ReactNode } from 'react'

type ModalPosition = 'top left' | 'center'
export interface ModalProps {
  className?: string
  isOpen?: boolean
  onClose?: () => void
  position?: ModalPosition
}

type WithChildren = {
  children: ReactNode | ((close: () => void) => ReactNode);
}

const positionToMap: Record<ModalPosition, string> = {
  'center': cls.center,
  'top left': classNames(cls.top, cls.left),
}

export const Modal = ({
  className,
  isOpen,
  onClose,
  children,
  position = 'center',
}: ModalProps & WithChildren) => {
  const { isClosing, closeHandler } = useModal({
    onClose,
    isOpen
  })

  return (
    <Portal>
      <div className={classNames(
        cls.modal,
        { [cls.opened]: isOpen, [cls.isClosing]: isClosing },
        [className])}
      >
        <Overlay onClick={closeHandler} />
        <div className={classNames(cls.content, {}, [positionToMap[position]])}>
          {typeof children === 'function' ? children(closeHandler) : children}
        </div>
      </div>
    </Portal>
  )
}