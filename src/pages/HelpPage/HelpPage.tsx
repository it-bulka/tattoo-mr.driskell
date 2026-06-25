import cls from './HelpPage.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '@/shared/ui'
import { CategoriesBlock } from './blocks/CategoriesBlock/CategoriesBlock'
import { FaqBlock } from './blocks/FaqBlock/FaqBlock'
import { SupportBlock } from './blocks/SupportBlock/SupportBlock'
import { SeoMeta } from '@/shared/libs'

interface HelpPageProps {
  className?: string
}

const HelpPage = ({ className }: HelpPageProps) => {
  const { t } = useTranslation()

  return (
    <div className={classNames(cls.helpPage, {}, [className])}>
      <SeoMeta
        title="Допомога"
        description="Відповіді на поширені запитання: доставка, оплата, гарантія."
      />
      <Breadcrumbs className="container" />
      <h1 className="pageTitle container">{t('help')}</h1>
      <CategoriesBlock />
      <FaqBlock />
      <SupportBlock />
    </div>
  )
}

export default HelpPage
