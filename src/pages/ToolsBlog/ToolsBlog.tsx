import cls from './ToolsBlog.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '@/shared/ui'
import { Content } from './Content/Content.tsx'
import { Section } from './Section/Section.tsx'
import { article, mapSections } from '@/mockData.tsx'
import { use, memo } from 'react'

interface ToolsBlogProps {
  className?: string
}

const ToolsBlog = memo(({ className }: ToolsBlogProps) => {
  const { t } = useTranslation()

  const contentSections = use(mapSections(article.content))

  return (
    <div className={classNames(cls.toolsBlog, 'container pageSpacing', {}, [className])}>
      <Breadcrumbs />

      <div className={cls.article}>
        <h3 className={cls.title}>{article.title}</h3>
        <p className={cls.prologue}>{article.prologue}</p>
        <h4 className={cls.contentTitle}>{t('article content')}</h4>
        <Content list={contentSections} className={cls.content}/>
        <Section list={article.paragraphs} />
      </div>

    </div>
  )
})

ToolsBlog.displayName = 'ToolsBlog'

export default ToolsBlog