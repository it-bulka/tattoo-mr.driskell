import cls from './Additional.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { tattooMachineDetails } from '@/mockData.tsx';
import { FeatureItem } from '@/shared/ui'
import { DesctiptionTabs } from './DesctiptionTabs.tsx'
import { useDevice } from '@/shared/libs'

interface AdditionalProps {
  className?: string
}

export const Additional = ({ className }: AdditionalProps) => {
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
              {tattooMachineDetails.description.map((item, i) => (
                <p key={i}>{item}</p>
              ))}
            </div>
          </div>
          <div>
            <h3 className={cls.title}>{t('delivery and payment')}</h3>
            <div className={cls.content}>
              {tattooMachineDetails.description.map((item, i) => (
                <p key={i}>{item}</p>
              ))}
            </div>
          </div>
        </>
      )}
      <div className={cls.specifications}>
        <h3 className={cls.title}>{t('specifications')}</h3>
        <div className={cls.features}>
          <FeatureItem title={t('machine.needle stroke')} decription={'універсальна'}/>
          <FeatureItem title={t('machine.operating voltage')} decription={'До 12 V'}/>
          <FeatureItem title={t('machine.connector')} decription={'RCA'}/>
          <FeatureItem title={t('machine.manufacturer')} decription={'Foxxx Irons'}/>
          <FeatureItem title={t('machine.type')} decription={'Роторна'}/>
          <FeatureItem title={t('machine.purpose')} decription={'універсальна'}/>
        </div>
      </div>
    </div>
  )
}