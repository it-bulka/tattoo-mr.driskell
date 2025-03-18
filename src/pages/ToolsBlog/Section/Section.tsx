import cls from './Section.module.scss'
import { ReactNode } from 'react'
import { Paragraph } from '@/pages/ToolsBlog/model/type/type.ts'

type ParagraphType = 'paragraph' | 'list' | 'title' | 'img'
type StringProps = { content: string,  link?: string }
type ArrProps = { content: string[],  link?: string }
type ImgProps = { content: string,  link?: string, alt?: string }

const setIdAttribute = (props: object): {id: string } | Record<string, never>  => {
  if ('link' in props) {
    return { id: `${props.link}` }
  }

  return {}
}
const RenderTitle = (props: StringProps) => {
  const attribute = setIdAttribute(props)
  return (
    <h3 className={cls.title} {...attribute}>
      {props.content}
    </h3>
  )
}

const RenderList = (props: ArrProps) => {
  const attribute = setIdAttribute(props)
  return (
    <ul className={cls.list} {...attribute}>
      {props.content.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}

const RenderParagraph = (props: ArrProps) => {
  const attribute = setIdAttribute(props)
  return (
    <p {...attribute}>
      {props.content}
    </p>
  )
}

const RenderImg = (props: ImgProps) => {
  const attribute = setIdAttribute(props)
  return <img alt={props.alt || 'image'} src={props.content} className={cls.img} {...attribute}/>
}

const mapParagraphType: Record<ParagraphType, (props: any) => ReactNode> = {
  title: RenderTitle,
  list: RenderList,
  paragraph: RenderParagraph,
  img: RenderImg
}

export const Section = ({ list }: {list: Paragraph[]}) => {
  return (
    <div className={cls.section}>
      {list.map(item => {
        const Component = mapParagraphType[item.type]
        return <Component key={item.id} {...item} />
      })}
    </div>
  )
}