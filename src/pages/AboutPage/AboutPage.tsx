import cls from './AboutPage.module.scss'
import classNames from 'classnames'
import { HeroBlock } from './blocks/HeroBlock/HeroBlock'
import { StoryBlock } from './blocks/StoryBlock/StoryBlock'
import { ValuesBlock } from './blocks/ValuesBlock/ValuesBlock'
import { StatsBlock } from './blocks/StatsBlock/StatsBlock'
import { BrandsBlock } from './blocks/BrandsBlock/BrandsBlock'
import { CtaBlock } from './blocks/CtaBlock/CtaBlock'

interface AboutPageProps {
  className?: string
}

const AboutPage = ({ className }: AboutPageProps) => {
  return (
    <div className={classNames(cls.aboutPage, {}, [className])}>
      <HeroBlock />
      <StoryBlock />
      <ValuesBlock />
      <StatsBlock />
      <BrandsBlock />
      <CtaBlock />
    </div>
  )
}

export default AboutPage
