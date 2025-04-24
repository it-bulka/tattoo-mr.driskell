import { Drawer, useDrawer } from '@/shared/ui'
import { ShareContent } from './blocks/ShareContent.lazy.tsx'
import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import classNames from 'classnames'
import cls from './ShareButton.module.scss'

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

      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer}>
        {isDrawerOpen && <ShareContent />}
      </Drawer>
    </>
  )
})