import { Input, type InputProps } from '@/shared/ui/Input/Input'

type AuthInputProps = Omit<InputProps, 'size'>

export const AuthInput = ({
  label,
  ...rest
}: AuthInputProps) => {
  return (
    <Input size='sm' label={label} {...rest} />
  )
}