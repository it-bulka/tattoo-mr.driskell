import cls from './TopLoader.module.scss'
import { memo } from 'react'

interface TopLoaderProps {
  isLoading: boolean
}

export const TopLoader = memo(({ isLoading }: TopLoaderProps) => {
  if (!isLoading) return null

  return <div className={cls.topLoader} role="progressbar" aria-label="Loading" />
})

TopLoader.displayName = 'TopLoader'
