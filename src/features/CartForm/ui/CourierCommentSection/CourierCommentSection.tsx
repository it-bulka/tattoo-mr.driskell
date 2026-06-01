import cls from './CourierCommentSection.module.scss'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Textarea } from '@/shared/ui'
import { CartFormData } from '../../model/types/cartFormTypes.tsx'

export const CourierCommentSection = () => {
  const { t } = useTranslation()
  const { control } = useFormContext<CartFormData>()

  return (
    <Controller
      name="comment"
      control={control}
      render={({ field }) => (
        <Textarea
          {...field}
          label={t('form.comment')}
          placeholder={t('placeholder.comment')}
          className={cls.comment}
        />
      )}
    />
  )
}
