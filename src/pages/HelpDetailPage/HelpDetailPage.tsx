import cls from './HelpDetailPage.module.scss'
import { useParams, Navigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '@/shared/ui'
import { useSeoMeta } from '@/shared/libs'
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig'
import { getHelpArticleBySlug } from './model/helpArticles'

const HelpDetailPage = () => {
  const { t } = useTranslation()
  const { slug } = useParams<{ slug: string }>()

  const article = slug ? getHelpArticleBySlug(slug) : undefined

  if (!article) {
    return <Navigate to={RoutePaths.not_found} replace />
  }

  const title = t(article.titleKey)

  return (
    <div className={cls.page}>
      {useSeoMeta({
        title,
        description: t(article.descriptionKey),
      })}
      <div className="container">
        <Breadcrumbs customLastCrumb={title} />
        <h1 className="pageTitle">{title}</h1>

        <p className={cls.description}>{t(article.descriptionKey)}</p>

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
