import cls from './FormBlock.module.scss'
import classNames from 'classnames'
import FormImg from '@/shared/assets/others/form-img.png'
import { Form } from './Form.tsx';
import { useTranslation } from 'react-i18next'

interface FormProps {
  className?: string
}
export const FormBlock = ({ className }: FormProps) => {
  const { t } = useTranslation()
  return (
    <div className={classNames(cls.formBlock, 'right-container', {}, [className])}>
      <div>
        <h3 className="pageTitle margin-0">{t('form.first to know')}</h3>
        <p className={cls.text}>{t('form.subscribe text')}</p>
        <Form />
      </div>
      <img src={FormImg} alt="tattoo machine image"/>
    </div>
  )
}