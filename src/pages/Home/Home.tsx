import cls from './Home.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

interface HomeProps {
  className?: string
}
const Home = ({ className }: HomeProps) => {
  const { t } = useTranslation()

  return (
    <div className={classNames(cls.home, {}, [className])}>
      {t("home")}
    </div>
  )
}

export default Home