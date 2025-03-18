import cls from './Content.module.scss'
import { AppLink } from '@/shared/ui';
import { SubSectionType, SubSubSectionType, SectionType } from '../model/type/type.ts';
import classNames from 'classnames';

interface ContentProps {
  className?: string
  list: SectionType[]
}

const renderSubSubSections = (list: SubSubSectionType[]) => {
  if(!list.length) {
    return null
  }
  return (
    <ul className={cls.subSubsections}>
      {list.map(({id, title}) => (
        <li className={cls.subSubsection} key={id}>
          <AppLink to={`#${id}`} anchorScroll>{title}</AppLink>
        </li>
      ))}
    </ul>
  )
}

const renderSubSections = (list: SubSectionType[]) => {
  if(!list.length) {
    return null
  }

  return (
    <ul>
      {list.map(({id, title, subSubSections}) => {
        const subSubsectionsList = renderSubSubSections(subSubSections)
        return (
          <li className={cls.subsection} key={id}>
            <AppLink to={`#${id}`} anchorScroll>{title}</AppLink>
            {subSubsectionsList}
          </li>
        )
      })}
    </ul>
  )
}

const renderSection = (section: SectionType) => {
  const subSections = renderSubSections(section.subSections)

  return (
    <li className={cls.section} key={section.id}>
      <AppLink to={`#${section.id}`} anchorScroll>{section.title}</AppLink>
      {subSections}
    </li>
  )
}

export const Content = ({ list, className }: ContentProps) => {
  return (
    <ul className={classNames(cls.content, {}, [className])}>
      <div className={classNames("decorator vertical full gray", {}, [cls.decorator])} />
      {list.map(renderSection)}
    </ul>
  )
}