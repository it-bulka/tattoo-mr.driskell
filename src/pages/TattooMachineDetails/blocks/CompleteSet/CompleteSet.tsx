import cls from './CompleteSet.module.scss'
import clsGeneral from '../../TattooMachineDetails.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { CardWithImgCheckboxSlider } from '@/shared/ui'
import { memo } from 'react'
import { Button } from '@/shared/ui'
import { currencyFormat } from '@/shared/libs'

import { productsList } from '@/mockData.tsx';
const completedProds = productsList.slice(0, 3)

export const CompleteSet = memo(() => {
  const { t } = useTranslation()

  return (
    <>
      <h3 className={classNames(clsGeneral.blockTitle, clsGeneral.blockHeader, 'container')}>
        {t('more products — bigger discount')}
      </h3>

      <div className={classNames(cls.completeSet, 'container')}>
        <div className={cls.content}>
          <p className={cls.info}>{t('complete the set with the necessary items')}</p>
          <div className={cls.cards}>
            {completedProds.map((product, i) => {
              return (
                <>
                  <CardWithImgCheckboxSlider
                    key={product.id}
                    imgs={product.imgs}
                    title={product.title}
                    paginationId={'more_prods' + product.id}
                    price={product.price}
                    checked={true}
                    className={cls.card}
                  />

                  {(completedProds.length - 1 !== i) && (<span className={cls.plus} />)}
                </>
              )
            })}
          </div>

          <div className={classNames("decorator full gray croppedPoligon static", cls.decorator)}/>

          <div className={cls.actions}>
            <Button withMargin dark className={cls.btn}>{t('add to cart')}</Button>

            <div className={cls.price}>
              <p className={cls.title}>{t("items_count", { count: completedProds.length })}</p>
              <p className={'currentPrice'}>{currencyFormat(6000)}</p>
              <p className={'prevPrice'}>7200</p>
            </div>

            <p className={cls.discount}>{currencyFormat(1200)}</p>
          </div>
        </div>
      </div>

    </>
  )
})