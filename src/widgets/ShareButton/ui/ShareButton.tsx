import { useDrawer } from '@/shared/ui'
import { ShareContent } from './blocks/ShareContent.lazy.tsx'
import { useTranslation } from 'react-i18next'
import { lazy, Suspense, memo } from 'react'
import classNames from 'classnames'
import cls from './ShareButton.module.scss'

const Drawer = lazy(() =>
  import('@/shared/ui/Drawer/ui/Drawer').then(m => ({ default: m.Drawer }))
)

interface ShareButtonProps {
  className?: string
}

export const ShareButton = memo(({ className }: ShareButtonProps) => {
  const { isDrawerOpen, openDrawer, closeDrawer } = useDrawer()
  const { t } = useTranslation()

  return (
    <>
      <button onClick={openDrawer} className={classNames(cls.share, {}, [className])}>
        {t('share')}
      </button>

      {isDrawerOpen && (
        <Suspense fallback={null}>
          <Drawer isOpen={isDrawerOpen} onClose={closeDrawer}>
            <ShareContent />
          </Drawer>
        </Suspense>
      )}
    </>
  )
})