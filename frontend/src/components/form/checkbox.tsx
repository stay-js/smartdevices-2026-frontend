import {
  type Control,
  Controller,
  type FieldPath,
  type FieldValues,
  type PathValue,
} from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';

type FormInputProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
  control: Control<TFieldValues>;
  label: string;
  name: TName;
} & (PathValue<TFieldValues, TName> extends boolean | null | undefined
  ? {}
  : { _error: 'Field value must match boolean | undefined | null' });

export function FormCheckbox<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({ control, label, name }: FormInputProps<TFieldValues, TName>) {
  return (
    <FieldGroup>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={field.value ?? false}
                id={name}
                name={field.name}
                onBlur={field.onBlur}
                onCheckedChange={field.onChange}
                ref={field.ref}
              />

              <FieldLabel htmlFor={name}>{label}</FieldLabel>
            </div>
          </Field>
        )}
      />
    </FieldGroup>
  );
}
