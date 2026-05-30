import { Button } from '@/shared/ui'
import { PropsWithChildren } from 'react'

interface AuthButtonProps {
  onClick?: () => void
}
export const AuthButton = ({
  children,
  onClick
}: PropsWithChildren<AuthButtonProps>) => {
  return (
    <Button max dark type="submit" onClick={onClick}>{children}</Button>
  )
}