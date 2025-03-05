import classNames from 'classnames'

interface SliderDotProps {
  className?: string
}
export const SliderDot = ({ className }: SliderDotProps) => {
  return (
    <div className={classNames('swiper-custom-bullet', {}, [className])}>
      <div className="inner"/>
    </div>
  )
}