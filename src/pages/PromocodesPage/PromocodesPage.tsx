import cls from './PromocodesPage.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Card, CardsGrid } from '@/shared/ui'
import { promoCodes } from '@/mockData.tsx'
import { Breadcrumbs } from '@/shared/ui'
import { useHandleCopy } from '@/shared/libs'

interface PromocodesPageProps {
  className?: string
}
const PromocodesPage = ({ className }: PromocodesPageProps) => {
  const { t } = useTranslation()
  const handleCopy = useHandleCopy()

  return (
    <div className={classNames('pageSpacing', {}, [className])}>
      <Breadcrumbs className="container"/>
      <h3 className='pageTitle container'>{t('promo codes')}</h3>
      <CardsGrid className={cls.cardsGrid}>
        {promoCodes.map(promoCode => (
          <Card
            key={promoCode.id}
            title={promoCode.title}
            btnTitle={t('copy promo code')}
            img={promoCode.img}
            onBtnClick={() =>  handleCopy(promoCode.code)}
          >
            {promoCode.description.map(item => (
              <p key={item} className={cls.paragraph}>
                {item}
              </p>
            ))}
          </Card>
        ))}
      </CardsGrid>
    </div>
  )
}

export default PromocodesPage