import cls from './ImgSlide.module.scss'
import classNames from 'classnames'
import { Tag, type TagType } from '../../Tag/Tag.tsx'
import { CheckBox } from '../../CheckBox/CheckBox.tsx'
import { LikeProductButton } from '@/features'
import { memo, useMemo } from 'react'

export type Slide = {
  id: string
  img: string
  alt?: string
  tags?: TagType[]
}

export type WithCheckbox = {
  checked: boolean
  onCheckClick?: () => void
}

export type ImgSlideProps =  {
  className?: string
  onLikeClick?: () => void
  withAdaptation?: boolean
} & Slide  & ({} | WithCheckbox)

export const ImgSlide = memo(({ className, withAdaptation, img, id, ...rest }: ImgSlideProps) => {
  const actionContent = useMemo(() => {
    if('checked' in rest) {
      return (
        <CheckBox checked={rest.checked} onClick={rest.onCheckClick}/>
      )
    }

    return (
      <div className={cls.tags}>
        {rest.tags?.map((tag) => (
          <Tag type={tag} key={tag}/>
        ))}
      </div>
    )
  }, [rest])

  return (
    <div className={classNames(
      cls.slide,
      {[cls.adaptiveWithCheckbox]: withAdaptation && 'checked' in rest},
      {[cls.adaptiveWithTags]: withAdaptation && !('checked' in rest)},
      [className])}
    >
      <div className={cls.actions}>
        {actionContent}
        <LikeProductButton machineId={id}/>
      </div>
      <img src={img} alt={rest.alt || 'slider image'} className={cls.img}/>
    </div>
  )
})