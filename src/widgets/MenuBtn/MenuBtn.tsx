import cls from './MenuBtn.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { memo, useState } from 'react'
import { Menu } from './Menu/Menu.tsx'

interface MenuBtnProps {
  className?: string
}
export const MenuBtn = memo(({ className }: MenuBtnProps) => {
  const { t } = useTranslation()
  const [isChecked, setChecked] = useState(false)

  return (
    <>
      <label className={classNames(cls.menuBtn, {}, [className])}>
        <span className={cls.title}>{t('menu')}</span>
        <input type="checkbox" onChange={() => setChecked(prev => !prev)} checked={isChecked}/>
        <div className={cls.burger}>
          <div className={cls.inner}>
            <span />
            <span />
            <span />
          </div>
        </div>
      </label>
      <Menu isOpen={isChecked}/>
    </>
  )
})

MenuBtn.displayName = 'MenuBtn'