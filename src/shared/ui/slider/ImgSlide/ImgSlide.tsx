import cls from './ImgSlide.module.scss'
import classNames from 'classnames'
import { Tag, type TagType } from '../../Tag/Tag.tsx'
import { CheckBox } from '../../CheckBox/CheckBox.tsx'
import { LikeButton } from '@/features'
import { memo, useMemo } from 'react'

export type Slide = {
  id: string
  img: string
  alt?: string
  tags: TagType[]
}

type SlideWithTags = Omit<Slide, 'id'>
type SlideWithCheckbox = Omit<Slide, 'tags'> & {
  checked: boolean
  onClick?: () => void
}

type ImgSlideProps =  {
  className?: string
  onLikeClick?: () => void
} & (SlideWithTags | SlideWithCheckbox)

export const ImgSlide = memo(({ className, img, ...rest }: ImgSlideProps) => {
  const actionContent = useMemo(() => {
    if ('tags' in rest) {
      return (
        <div className={cls.tags}>
          {rest.tags.map((tag) => (
            <Tag type={tag} key={tag}/>
          ))}
        </div>
      )
    }

    if('checked' in rest) {
      return (
        <CheckBox checked={rest.checked} onClick={rest.onClick}/>
      )
    }
  }, [rest])

  return (
    <div className={classNames(cls.slide, [className])}>
      <div className={cls.actions}>
        {actionContent}
        <LikeButton />
      </div>
      <img src={img} alt={rest.alt || 'slider image'} className={cls.img}/>
    </div>
  )
})