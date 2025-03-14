import cls from './Services.module.scss'
import { useTranslation } from 'react-i18next'
import { ServiceCard, ServiceCardProps } from '@/entities';
import urgentDelivery from '@/shared/assets/pages/additionalServices/urgent-delivery.png';
import guarantee from '@/shared/assets/pages/additionalServices/guarantee.png';
import extendedWarranty from '@/shared/assets/pages/additionalServices/extended-warranty.png';
import gift from '@/shared/assets/pages/additionalServices/gift.png';

interface ServicesProps {
}

const services: ServiceCardProps[] = [
  {
    title: 'urgent delivery.title',
    description: 'urgent delivery.info',
    img: urgentDelivery,
    price: 250
  },
  {
    title: 'postal guarantee.title',
    description: 'postal guarantee.info',
    img: guarantee,
    price: 250
  },
  {
    title: 'extended warranty.title',
    description: 'extended warranty.info',
    img: extendedWarranty,
    price: 250
  },
  {
    title: 'gift wrapping.title',
    description: 'gift wrapping.info',
    img: gift,
    price: 250
  }
]

export const Services = ({ }: ServicesProps) => {
  const { t } = useTranslation()

  return (
    <div className={cls.services}>
      {services.map(service => (
        <ServiceCard
          title={t(service.title)}
          description={t(service.description)}
          price={service.price}
          img={service.img}
          key={service.title}
        />
      ))}
    </div>
  )
}