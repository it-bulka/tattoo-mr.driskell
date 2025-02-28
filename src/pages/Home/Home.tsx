import cls from './Home.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Tag } from '@/shared/ui/Tag/Tag.tsx'

interface HomeProps {
  className?: string
}
const Home = ({ className }: HomeProps) => {
  const { t } = useTranslation()

  return (
    <div className={classNames(cls.home, {}, [className])}>
      <Tag>
        {t("home")}
      </Tag>
    </div>
  )
}

export default Home