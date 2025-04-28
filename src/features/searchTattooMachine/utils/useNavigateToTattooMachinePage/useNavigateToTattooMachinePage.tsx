import { useNavigate } from 'react-router'
import { getTattooMachineDetailsPage } from '@/shared/config/routeConfig/routeConfig.tsx'
import { useCallback } from 'react'

export const useNavigateToTattooMachinePage = () => {
  const navigate = useNavigate()

  const goToProductPage = useCallback((productId: string) => {
    navigate(getTattooMachineDetailsPage(productId))
  }, [navigate])

  return goToProductPage
}