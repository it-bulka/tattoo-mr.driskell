import { Input, type InputProps } from '@/shared/ui/Input/Input'

interface AuthInputProps extends Omit<InputProps, 'size'> {}

export const AuthInput = ({
  label,
  ...rest
}: AuthInputProps) => {
  return (
    <Input size='sm' label={label} {...rest} />
  )
}