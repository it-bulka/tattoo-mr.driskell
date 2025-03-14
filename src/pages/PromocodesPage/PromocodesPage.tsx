import cls from './PromocodesPage.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Card, CardsGrid } from '@/shared/ui'
import { promoCodes } from '@/mockData.tsx'
import { Breadcrumbs } from '@/shared/ui'

interface PromocodesPageProps {
  className?: string
}
const PromocodesPage = ({ className }: PromocodesPageProps) => {
  const { t } = useTranslation()

  return (
    <div className={classNames('pageSpacing', {}, [className])}>
      <Breadcrumbs className="container"/>
      <h3 className='pageTitle container'>{t('promo codes')}</h3>
      <CardsGrid>
        {promoCodes.map(promoCode => (
          <Card
            title={promoCode.title}
            btnTitle={t('copy promo code')}
            img={promoCode.img}
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