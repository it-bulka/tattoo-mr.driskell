import cls from './HelpDetailPage.module.scss'
import { useParams, Navigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '@/shared/ui'
import { SeoMeta } from '@/shared/libs'
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig'
import { getHelpArticleBySlug } from './model/helpArticles'

const HelpDetailPage = () => {
  const { t } = useTranslation()
  const { slug } = useParams<{ slug: string }>()

  const article = slug ? getHelpArticleBySlug(slug) : undefined
  const title = article ? t(article.titleKey) : ''
  const description = article ? t(article.descriptionKey) : ''

  if (!article) {
    return <Navigate to={RoutePaths.not_found} replace />
  }

  return (
    <div className={cls.page}>
      <SeoMeta
        title={title || 'Not Found'}
        description={description}
      />
      <div className="container">
        <Breadcrumbs customLastCrumb={title} />
        <h1 className="pageTitle">{title}</h1>

        <p className={cls.description}>{description}</p>

        <div className={cls.sections}>
          {article.sections.map(section => (
            <section key={section.titleKey} className={cls.section}>
              <h2 className={cls.sectionTitle}>{t(section.titleKey)}</h2>
              <p className={cls.sectionText}>{t(section.textKey)}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HelpDetailPage
