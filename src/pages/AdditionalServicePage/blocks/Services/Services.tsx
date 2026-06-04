import cls from './Services.module.scss'
import { useTranslation } from 'react-i18next'
import { ServiceCard } from '@/entities/ServiceCard/ServiceCard'
import { useGetServicesQuery } from '@/entities/Service'
import { getSelectedServicesSelector } from '@/entities/Order/model/selectors/orderSelectors';
import { orderActions } from '@/entities/Order/model/slice/orderSlice'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/app/providers/StoreProvider/config/store.ts'
import { useCallback } from 'react'

export const Services = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { data: services, isLoading, isError } = useGetServicesQuery()
  const selectedServices = useSelector(getSelectedServicesSelector)

  const handleToggle = useCallback((id: string) => {
    dispatch(orderActions.toggleService(id))
  }, [dispatch])

  if (isLoading) return null
  if (isError) return <p>{t('error loading services')}</p>
  if (!services?.length) return null

  return (
    <div className={cls.services}>
      {services.map(service => (
        <ServiceCard
          key={service._id}
          title={service.name}
          description={service.description}
          price={service.type === 'fixed'
            ? `${service.value} ${service.currency}`
            : `${service.value}%`}
          isSelected={selectedServices.includes(service._id)}
          onToggle={() => handleToggle(service._id)}
        />
      ))}
    </div>
  )
}
