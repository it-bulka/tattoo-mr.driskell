import { Button, ButtonProps } from '@/shared/ui'
import { useTranslation } from 'react-i18next'
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx'
import { useNavigate } from 'react-router'
import { memo } from 'react'

interface GoHomeProps extends Omit<ButtonProps, 'onClick' | 'type' | 'dark' | 'withMargin'> {}

export const GoHomeButton = memo((props: GoHomeProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Button
      {...props}
      dark
      withMargin
      onClick={() => navigate(RoutePaths.home)}
    >
      {t('go home button')}
    </Button>
  )
})

GoHomeButton.displayName = 'GoHomeButton'