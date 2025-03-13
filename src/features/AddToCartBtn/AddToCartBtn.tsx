import { useTranslation } from 'react-i18next'
import { Button, type ButtonProps} from '@/shared/ui'

interface AddToCartBtnProps extends ButtonProps {}
export const AddToCartBtn = (props: AddToCartBtnProps) => {
  const { t } = useTranslation()

  //TODO: add logic for adding
  return <Button {...props}>{t('add to cart')}</Button>
}