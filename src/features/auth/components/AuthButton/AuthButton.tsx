import { Button } from '@/shared/ui'
import { PropsWithChildren } from 'react'

interface AuthButtonProps {
  onClick?: () => void
  disabled?: boolean
}

export const AuthButton = ({ children, onClick, disabled }: PropsWithChildren<AuthButtonProps>) => (
  <Button max dark type="submit" onClick={onClick} disabled={disabled}>{children}</Button>
)