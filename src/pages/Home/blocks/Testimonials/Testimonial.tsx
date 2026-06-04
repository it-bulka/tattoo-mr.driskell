import cls from './Testimonials.module.scss'
import classNames from 'classnames'
import InstagramIcon from '@/shared/assets/general/inst.svg?react'
import AvatartImg from '@/shared/assets/pages/testimonials/avatar.png'

import { AppLink } from '@/shared/ui/AppLink/AppLink';

interface TestimonialProps {
  className?: string
}
export const Testimonial = ({ className }: TestimonialProps) => {
  return (
    <div className={classNames(cls.testimonial, {}, [className])}>
      <img src={AvatartImg} alt={`@Velli7350 avatar`} className={cls.avatar}/>
      <div className={cls.content}>
        <p>
          Замовив уперше, замовлення прийшло вчасно, усе чудово запаковано, і все відповідає опису. Але є один маленький нюанс — усі коробки пом'яті. Можливо, це сталося під час пакування, або ж на складі так ставляться до товару. Загалом всім задоволений, буду замовляти ще. Рекомендую цей інтернет-магазин для покупок! 😊
        </p>
        <AppLink to='/' className={cls.link}>
          <InstagramIcon />
          <p>@Velli7350</p>
        </AppLink>
        <div className={classNames("decorator full top")}/>
        <div className={classNames("decorator full")}/>
      </div>
    </div>
  )
}