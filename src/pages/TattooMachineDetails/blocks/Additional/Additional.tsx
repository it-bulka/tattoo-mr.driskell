import cls from './Additional.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { FeatureItem } from '@/shared/ui'
import { DesctiptionTabs } from './DesctiptionTabs.tsx'
import { useDevice } from '@/shared/libs'
import { Spec } from '@/shared/type/tattoo-machine.ts'

interface AdditionalProps {
  className?: string
  description: string[]
  specs: Spec[]
}

export const Additional = ({
  className, description, specs
}: AdditionalProps) => {
  const { t } = useTranslation()
  const isMobile = useDevice(1200)

  return (
    <div className={classNames(cls.additional, {}, [className])}>
      { isMobile ? (
        <DesctiptionTabs />
      ): (
        <>
          <div>
            <h3 className={cls.title}>{t('description')}</h3>
            <div className={cls.content}>
              {description.map((item, i) => (
                <p key={i}>{item}</p>
              ))}
            </div>
          </div>
          <div>
            <h3 className={cls.title}>{t('delivery and payment')}</h3>
            <div className={cls.content}>
              {description.map((item, i) => (
                <p key={i}>{item}</p>
              ))}
            </div>
          </div>
        </>
      )}
      <div className={cls.specifications}>
        <h3 className={cls.title}>{t('specifications')}</h3>
        <div className={cls.features}>
          {specs.map((spec, i) => (
            <FeatureItem key={i} title={spec.name} decription={spec.value} />
          ))}
        </div>
      </div>
    </div>
  )
}