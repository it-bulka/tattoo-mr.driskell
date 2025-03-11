import cls from './NotFound.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import NotFoundImg from '@/shared/assets/pages/notFound/not-found.png'
import { Button, DecoratedLink } from '@/shared/ui'
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx'
import { useNavigate } from 'react-router'

interface NotFoundProps {
  className?: string
}
const NotFound = ({ className }: NotFoundProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <section className={classNames(cls.notFound, "container", {}, [className])}>
      <div className={cls.content}>
        <h1 className={cls.title}>{t('404')}</h1>
        <p className={cls.text}>{t('page not found')}</p>
        <div className={cls.btns}>
          <Button
            dark
            onClick={() => navigate(RoutePaths.home, { replace: true })}
          >
            {t('return to the homepage')}
          </Button>
          <DecoratedLink to={RoutePaths.catalog} replace>{t('return to the catalog')}</DecoratedLink>
        </div>
      </div>
      <img src={NotFoundImg} alt={"404 image"} className={cls.img}/>
    </section>
  )
}

export default NotFound