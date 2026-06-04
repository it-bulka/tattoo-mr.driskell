import { memo } from 'react'
import { NavigationSlider } from '@/shared/ui/slider/NavigationSlider/NavigationSlider';
import { Modal, type ModalProps } from '@/shared/ui/Modal/Modal';
import { SwiperSlide } from 'swiper/react'
import cls from './TattooWorksSlider.module.scss'

interface TattooWorksSliderProps {
  className?: string
  list: string[]
}
const TattooWorksSlider = memo(({
  className,
  list,
}: TattooWorksSliderProps) => {
  return (
    <NavigationSlider
      slidesPerView={1}
      loop
      className={className}
    >
      {list.map(item => (
        <SwiperSlide key={item}>
          <img src={item} alt="tatto work" className={cls.img} />
        </SwiperSlide>
      ))}
    </NavigationSlider>
  )
})

TattooWorksSlider.displayName = 'TattooWorksSlider'

type TattooWorksModelProps = ModalProps & TattooWorksSliderProps

export const TattooWorksModel = ({
  isOpen,
  onClose,
  ...restProps
}: TattooWorksModelProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={cls.wrapper}>
        <TattooWorksSlider {...restProps}/>
      </div>
    </Modal>
  )
}