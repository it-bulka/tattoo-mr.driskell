import cls from './PromocodesPage.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Card } from '@/shared/ui/Card/Card'
import { CardsGrid, ErrorMsg, Breadcrumbs } from '@/shared/ui'
import { useHandleCopy, useSeoMeta, dateFormat } from '@/shared/libs'
import { useGetPromoCodesQuery } from '@/entities/PromoCode'
import { PromocodesPageLoader } from './PromocodesPageLoader'

interface PromocodesPageProps {
  className?: string
}

const PromocodesPage = ({ className }: PromocodesPageProps) => {
  const { t } = useTranslation()
  const handleCopy = useHandleCopy()
  const { data: promoCodes, isLoading, isError } = useGetPromoCodesQuery()

  return (
    <div className={classNames('pageSpacing', {}, [className])}>
      {useSeoMeta({
        title: 'Промокоди',
        description: 'Промокоди та купони на знижку в магазині тату-обладнання.',
      })}
      <Breadcrumbs className="container"/>
      <h1 className='pageTitle container'>{t('promo codes')}</h1>

      {isLoading && <PromocodesPageLoader />}
      {isError && <ErrorMsg as="p" size="medium" className="container" text={t('loading error')} />}

      {promoCodes?.length === 0 && (
        <p className={classNames(cls.empty, 'container')}>{t('no promo codes')}</p>
      )}

      {!!promoCodes?.length && (
        <CardsGrid className={cls.cardsGrid}>
          {promoCodes.map(promoCode => (
            <Card
              key={promoCode.id}
              title={promoCode.title}
              btnTitle={t('copy promo code')}
              img={promoCode.imgUrl || '/default.png'}
              imgFallback="/default.png"
              onBtnClick={() => handleCopy(promoCode.code)}
            >
              {promoCode.description.map(item => (
                <p key={item} className={cls.paragraph}>{item}</p>
              ))}
              <p className={cls.expiry}>
                {t('valid until')}: {dateFormat(new Date(promoCode.expiresAt))}
              </p>
            </Card>
          ))}
        </CardsGrid>
      )}

    </div>
  )
}

export default PromocodesPage
