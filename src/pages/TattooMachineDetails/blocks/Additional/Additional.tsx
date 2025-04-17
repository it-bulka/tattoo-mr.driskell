import cls from './Additional.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { FeatureItem } from '@/shared/ui'
import { DesctiptionTabs } from './DesctiptionTabs.tsx'
import { useDevice } from '@/shared/libs'
import { useMemo } from 'react'
import { Category, specsPropertyList, SpecsUnion } from '@/shared/type/tattoo-machine.ts'

interface AdditionalProps {
  className?: string
  category: Category
  description: string[]
  specs: SpecsUnion
}

const getCategorySpecs = (category: Category) => {
  return specsPropertyList[category]
}

export const Additional = ({
  className, description, category, specs
}: AdditionalProps) => {
  const { t } = useTranslation()
  const isMobile = useDevice(1200)

  const specsProperties = useMemo(() => {
    return getCategorySpecs(category)
  }, [category])

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
          {specsProperties.map(specProperty => {
            const existedSpec = specs[specProperty as keyof typeof specs]
            if (!existedSpec) return null

            return <FeatureItem title={t(`machine.${specProperty}`)} decription={existedSpec}/>
          })}
        </div>
      </div>
    </div>
  )
}