import { PropsWithChildren } from 'react'
import cls from './AuthContent.module.scss'
import { ErrorMsg, Button, VStack } from '@/shared/ui'
import NotFoundImg from '@/shared/assets/pages/notFound/not-found.png'
import { useTranslation } from 'react-i18next'

interface AuthContentProps {
  error?: string
  isLoading?: boolean
}

export const AuthContent = ({
  children,
  error,
  isLoading
}: PropsWithChildren<AuthContentProps>) => {
  const { t } = useTranslation('auth')
  return (
    <div className={cls.content}>
      {isLoading && (
        <div className={cls.loader}>
          Loading...
        </div>
      )}

      {error && (
        <div className={cls.error}>
          <VStack gap="10">
            <ErrorMsg text={error}/>
            <Button dark>{t('try later')}</Button>
          </VStack>
          <img src={NotFoundImg} alt={"404 image"} className={cls.img}/>
        </div>
      )}

      {children}
    </div>
  )
}