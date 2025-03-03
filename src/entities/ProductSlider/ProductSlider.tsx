import cls from './ProductSlider.module.scss'
import classNames from 'classnames'
import { useState } from 'react'

interface ProductSliderProps {
  className?: string
  slides: string[]
}
export const ProductSlider = ({ className, slides }: ProductSliderProps) => {
  const [slideIndex] = useState(0)
  return (
    <div className={classNames(cls.productSlider, {}, [className])}>
      <div className={cls.imgs}>
        {slides.map((slide) => (
          <img alt='img' src={slide} key={slide} className={cls.slide} data-slide="slide" />
        ))}
      </div>

      <div className={cls.dots}>
        {slides.map((slide, index) => (
          <button type="button" key={slide} className={classNames('', {[cls.active]: index === slideIndex})}/>
        ))}

      </div>
    </div>
  )
}