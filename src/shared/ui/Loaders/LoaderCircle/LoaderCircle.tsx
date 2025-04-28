import { memo } from 'react'
import cls from './LoaderCircle.module.scss'

export const LoaderCircle = memo(() => {
  return (
    <div className={cls.loader}>
      <svg className={cls.circularLoader} viewBox="25 25 50 50">
        <circle className={cls.loaderPath} cx="50" cy="50" r="20" fill="none" stroke-width="2"/>
      </svg>
    </div>
  )
})