import { PropsWithChildren, memo, useState, useEffect } from 'react'
import cls from './Drawer.module.scss'
import classNames from 'classnames'
import { Portal } from '../../Portal/Portal.tsx'
import { Overlay } from '../../Overlay/Overlay.tsx'
import { useMotionLib, withMotion } from '@/shared/libs/components'

interface DrawerProps {
  className?: string
  isOpen?: boolean
  onClose?: () => void
}

export const DrawerContent = memo(({
  children,
  isOpen = true,
  onClose
}: PropsWithChildren<DrawerProps>) => {
  const [isClosing, setIsClosing] = useState(false)
  const { motion, AnimatePresence } = useMotionLib().Motion

  useEffect(() => {
    if(!isOpen && isClosing) {
      setIsClosing(false)
    }
  }, [isOpen, isClosing])

  if (!isOpen) {
    return null
  }

  return (
    <Portal>
      <AnimatePresence>
        <motion.div
          className={cls.drawer}
          onClick={(e) => e.stopPropagation()}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.2}
          onDragEnd={(_event, info) => {
            const { velocity, offset } = info
            const screenHeight = window.innerHeight;

            const fastEnough = velocity.y > 800
            const farEnough = offset.y > screenHeight * 0.25

            if (fastEnough || farEnough) {
              setIsClosing(true)
            }
            // Otherwise nothing will be — Framer will automatically "bounce" back to animate={{ y: 0 }}.
          }}
          initial={{ y: '100%' }}
          animate={{ y: isClosing ? '100%' : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onAnimationComplete={() => {
            console.log('Drawer: onAnimationComplete')
            if (isClosing) {
              console.log('Drawer: isClosing', isClosing)
              onClose?.()
            }
          }}
        >
          <div className={cls.dragHandle} />

          <div className={classNames(cls.content, 'container')}>
            {children}
          </div>
        </motion.div>

        <Overlay />
      </AnimatePresence>
    </Portal>
  )
})


DrawerContent.displayName = 'DrawerContent'

export const Drawer = withMotion<PropsWithChildren<DrawerProps>>(DrawerContent)