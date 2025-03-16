import cls from './OpenBtn.module.scss'
import { useTranslation } from 'react-i18next'
import { DecoratedLink } from '@/shared/ui'
import classNames from 'classnames'

interface OpenBtnProps {
  onClick: () => void
  toHide?: boolean
  switchText:boolean
}
export const OpenBtn = ({
  onClick,
  toHide,
  switchText
}: OpenBtnProps) => {
  const { t } = useTranslation('cart')
  
  return (
    <div className={classNames(cls.openBtn, { [cls.hide]: toHide })}>
      <div className="decorator top gray full croppedPoligon"/>
      <DecoratedLink
        type="button"
        onClick={onClick}
        className={cls.btn}
      >
        {switchText ? t('more about the order') : t('hide information')}
      </DecoratedLink>
    </div>
  )
}