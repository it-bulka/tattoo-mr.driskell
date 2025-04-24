import classNames from 'classnames'
import cls from '@/pages/TattooMachineDetails/TattooMachineDetails.module.scss'
import { TattooMachineSlider } from '@/pages/TattooMachineDetails/blocks/TattooMachineSlider/TattooMachineSlider.tsx';
import { currencyFormat, useDevice } from '@/shared/libs'
import { getAvailability } from '@/pages/TattooMachineDetails/utils/getAvailability.ts'
import { CounterInput, DecoratedLink } from '@/shared/ui'
import { TattooWorksModel } from '@/pages/TattooMachineDetails/blocks/TattooWorksSlider/TattooWorksSlider.tsx';
import { tattooWorks } from '@/mockData.tsx'
import { AddToCartBtn } from '@/features'
import { useCallback, useRef, useState, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { ProductExtended } from '@/shared/type/tattoo-machine.ts'
import { ShareButton } from '@/widgets'

interface MainBlockProps {
  data: ProductExtended
  slug: string
}

export const MainBlock = memo(({ data, slug }: MainBlockProps) => {
  const { t } = useTranslation()
  const isMobile = useDevice(1200)
  const [isModalOpened, setModalOpened] = useState(false)
  const amountRef = useRef(0)
  const [isNullProduct, setNullProduct] = useState(amountRef.current === 0)

  const closeModal = () => setModalOpened(false)
  const openModal = () => setModalOpened(true)

  const updateQuantity = useCallback((prevQuantity: number) => (newQuantity: number) => {
    if(prevQuantity > 0 && newQuantity === 0) {
      setNullProduct(true)
    } else if (prevQuantity === 0 &&  newQuantity > 0) {
      setNullProduct(false)
    }

    amountRef.current = newQuantity
  }, [setNullProduct])

  return (
    <div className={classNames(cls.main, "container")}>
      <h2 className={cls.title}>
        {data.title}
      </h2>
      <div className={cls.slider}>
        <TattooMachineSlider
          slides={data.images}
          isMobile={isMobile}
          machineId={slug}
          tags={data.tags}
        />
      </div>
      <div className={cls.descriptWrapper}>
        <p className={cls.price}>
          <span className={cls.priceCurrent}>{currencyFormat(data.priceCurrent || data.price)}</span>
          {data.priceCurrent && <span className={cls.pricePrev}>{data.price}</span>}
        </p>

        <p className={cls.presence}>
          <span className={cls.presenceTitle}>{t('presence')}:</span>
          <span className={cls.presenceValue}>{t(getAvailability(data.stock))}</span>
        </p>

        <p className={cls.description}>
          {t('description')}<br />
          {data.shortDescription}
        </p>

        <div className={cls.link}>
          <DecoratedLink type="button" onClick={openModal}>
            {t('works made with this machine')}
          </DecoratedLink>
          <TattooWorksModel isOpen={isModalOpened} onClose={closeModal} list={tattooWorks}/>
        </div>
        <CounterInput
          className={cls.counter}
          onChange={updateQuantity(amountRef.current)}
        />
        <AddToCartBtn
          dark
          withMargin
          className={cls.addBtn}
          disabled={isNullProduct}
          products={[{
            ...data,
            quantity: amountRef.current
          }]}
        />

        <ShareButton  className={cls.share}/>
      </div>
    </div>
  )
})