import cls from './CompleteSet.module.scss'
import clsGeneral from '../../TattooMachineDetails.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { CardWithImgCheckboxSlider } from '@/shared/ui'
import { memo, useCallback, useMemo, useState, useEffect } from 'react'
import { currencyFormat } from '@/shared/libs'
import { Product } from '@/entities/ProductCard/ProductCard.tsx'
import { AddToCartBtn } from '@/features'

type OrderedProds = Record<string | number, Product>

const addIntoOrder = (array: Product[]): OrderedProds => {
  return array.reduce((acc, item) => {
    acc[item.id] = item
    return acc;
  }, {} as OrderedProds)
}

export const CompleteSet = memo(({ combo }: { combo: Product[]}) => {
  const { t } = useTranslation()
  const [ordered, setOrdered] = useState<Record<string, Product> | null>(null)

  useEffect(() => {
    setOrdered(addIntoOrder(combo))
  }, [combo])

  const toggleChecked = useCallback((prod: Product) => {
    setOrdered(prev => {
      const newOrdered = { ...prev }

      if (newOrdered[prod.id]) {
        delete newOrdered[prod.id]
      } else {
        newOrdered[prod.id] = prod
      }

      return newOrdered
    })
  }, [setOrdered])

  const calculateOrder = useCallback((arr: Product[]) => {
    return arr.reduce((acc, item) => {
      const priceCurrent = item.priceCurrent || 0
      const discount = item.price - priceCurrent

      const newAcc = {
        itemsAmount: acc.itemsAmount + 1,
        total: acc.total + item.price,
        discount: acc.discount + discount,
        current: acc.current + priceCurrent
      }

      return newAcc
    }, {
      itemsAmount: 0,
      total: 0,
      discount: 0,
      current: 0
    })
  }, [])

  const sumResult = useMemo(() => {
    const prods = Object.values(ordered || {})
    return calculateOrder(prods)
  }, [calculateOrder, ordered])

  const orderedIds = useMemo(() => {
    if (!ordered) return []

    return Object.values(ordered)
  }, [ordered])

  if(!ordered) return null

  return (
    <>
      <h3 className={classNames(clsGeneral.blockTitle, clsGeneral.blockHeader, 'container')}>
        {t('more products — bigger discount')}
      </h3>

      <div className={classNames(cls.completeSet, 'container')}>
        <div className={cls.content}>
          <p className={cls.info}>{t('complete the set with the necessary items')}</p>
          <div className={cls.cards}>
            {combo.map((product, i) => {
              return (
                <>
                  <CardWithImgCheckboxSlider
                    key={product.id}
                    imgs={product.images}
                    title={product.title}
                    paginationId={'more_prods' + product.id}
                    price={product.price}
                    checked={!!ordered[product.id]}
                    className={cls.card}
                    productId={product.id}
                    onCheckClick={() => toggleChecked(product)}
                  />

                  {(combo.length - 1 !== i) && (<span className={cls.plus} />)}
                </>
              )
            })}
          </div>

          <div className={classNames("decorator full gray croppedPoligon static", cls.decorator)}/>

          <div className={cls.actions}>
            <AddToCartBtn
              withMargin
              dark
              className={cls.btn}
              disabled={!sumResult.itemsAmount || !orderedIds}
              products={orderedIds}
            />

            <div className={cls.price}>
              <p className={cls.title}>{t("items_count", { count: sumResult.itemsAmount })}</p>
              <p className={'currentPrice'}>{currencyFormat(sumResult.current)}</p>
              {!!sumResult.total && <p className={'prevPrice'}>{sumResult.total}</p>}
            </div>

            <p className={cls.discount}>{currencyFormat(sumResult.discount)}</p>
          </div>
        </div>
      </div>

    </>
  )
})