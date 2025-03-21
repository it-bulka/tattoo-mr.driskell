import cls from './Modal.module.scss'
import classNames from 'classnames'
import { Portal } from '../Portal/Portal.tsx'
import { Overlay } from '../Overlay/Overlay.tsx'
import { useModal } from '@/shared/libs/useModal/useModal.tsx'
import { PropsWithChildren } from 'react'

export interface ModalProps {
  className?: string
  isOpen?: boolean
  onClose?: () => void
}

export const Modal = ({
  className,
  isOpen,
  onClose,
  children
}: PropsWithChildren<ModalProps>) => {
  const { isClosing, closeHandler } = useModal({
    onClose,
    isOpen
  })

  return (
    <Portal>
      <div className={classNames(cls.modal, { [cls.opened]: isOpen, [cls.isClosing]: isClosing }, [className])}>
        <Overlay onClick={closeHandler} />
        <div className={cls.content}>
          {children}
        </div>
      </div>
    </Portal>
  )
}