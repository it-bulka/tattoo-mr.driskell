import cls from './TattooMachineDetails.module.scss'
import classNames from 'classnames'
import { Breadcrumbs, DecoratedLink, CounterInput, Button } from '@/shared/ui'
import { currencyFormat, useDevice } from '@/shared/libs'
import { useTranslation } from 'react-i18next'
import { Additional } from './blocks/Additional/Additional.tsx'
import { TattooMachineSlider, type Slide } from './blocks/TattooMachineSlider/TattooMachineSlider.tsx'
import { tattooMachineDetails } from '@/mockData.tsx'

interface TattooMachineDetailsProps {
  className?: string
}

//TODO: add back

const TattooMachineDetails = ({ className }: TattooMachineDetailsProps) => {
  const { t } = useTranslation()
  const isMobile = useDevice(1200)
  return (
    <div className={classNames(cls.page, "container", {}, [className])}>
      <Breadcrumbs />
      <div className={cls.main}>
        <h2 className={cls.title}>
          Foxxx Viper Fox Golden Vintage Lot #1 RCA
        </h2>
        <div className={cls.slider}>
          <TattooMachineSlider
            slides={tattooMachineDetails.slides as Slide[]}
            isMobile={isMobile}
          />
        </div>
        <div className={cls.descriptWrapper}>
          <p className={cls.price}>
            <span className={cls.priceCurrent}>{currencyFormat(34920)}</span>
            <span className={cls.pricePrev}>36 000</span>
          </p>

          <p className={cls.presence}>
            <span className={cls.presenceTitle}>{t('presence')}:</span>
            <span className={cls.presenceValue}>Багато</span>
          </p>

          <p className={cls.description}>
            {t('description')}<br />
            Viper is a machine assembled with a powerful motor. The frame of this model is made of strong and lightweight aluminum alloy. As a result, the weight of this machine is only 120 grams.
          </p>

          <div className={cls.link}>
            <DecoratedLink to={'/'}>{t('works made with this machine')}</DecoratedLink>
          </div>
          <CounterInput  className={cls.counter}/>
          <Button dark withMargin className={cls.addBtn}>{t('add to cart')}</Button>
          <p className={cls.share}>{t('share')}</p>
        </div>
      </div>

      <Additional />
    </div>
  )
}
export default TattooMachineDetails