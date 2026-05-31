import { FieldValues, Path, useFormContext, Controller, get } from 'react-hook-form'
import { HTMLInputTypeAttribute } from 'react'
import { Input } from '../Input/Input.tsx'

export interface FieldConfig<T extends FieldValues> {
  name: Path<T>
  label: string
  placeholder: string
  type?: HTMLInputTypeAttribute
  className?: string
}

interface FormSectionProps<T extends FieldValues> {
  fields: FieldConfig<T>[]
  title?: string
  titleClassName?: string
  gridClassName?: string
}

export function FormSection<T extends FieldValues>({
  fields,
  title,
  titleClassName,
  gridClassName,
}: FormSectionProps<T>) {
  const { control, formState: { errors }, clearErrors } = useFormContext<T>()

  return (
    <>
      {title && <h3 className={titleClassName}>{title}</h3>}
      <div className={gridClassName}>
        {fields.map(field => (
          <Controller
            key={String(field.name)}
            name={field.name}
            control={control}
            render={({ field: formField }) => (
              <Input
                {...formField}
                type={field.type}
                label={field.label}
                placeholder={field.placeholder}
                className={field.className}
                error={get(errors, field.name)?.message}
                onInput={() => clearErrors(field.name)}
              />
            )}
          />
        ))}
      </div>
    </>
  )
}
