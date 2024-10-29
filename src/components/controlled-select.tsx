import {
  Select,
  type SelectProps,
  type SelectValue,
} from '@/components/form/select';
import {
  Controller,
  type Control,
  type FieldPath,
  type Path,
  type PathValue,
} from 'react-hook-form';
import { ErrorMessage } from './error-message';

type Props<
  TForm extends Record<string, unknown>,
  TField extends FieldPath<TForm>,
  TData,
  TValue extends SelectValue & PathValue<TForm, TField>,
> = Omit<SelectProps<TData, TValue>, 'label'> & {
  control: Control<TForm>;
  name: TValue extends PathValue<TForm, TField> ? TField : never;
  label?: string;
};

export function ControlledSelect<
  TForm extends Record<string, unknown>,
  TField extends FieldPath<TForm>,
  TData,
  TValue extends SelectValue & PathValue<TForm, TField>,
>({
  control,
  name,
  label,
  ...inputProps
}: Props<TForm, TField, TData, TValue>) {
  return (
    <Controller
      control={control}
      name={name as Path<TForm>}
      render={({
        field: { value, onChange, ref: _, ...fieldProps },
        fieldState,
      }) => (
        <div className="flex flex-col gap-1">
          <Select<TData, TValue>
            value={value as TValue}
            onChange={onChange}
            label={
              <span
                className={fieldState.error ? 'text-red-500' : 'text-black'}
              >
                {label}
              </span>
            }
            {...inputProps}
            {...fieldProps}
          />
          {fieldState.error && (
            <ErrorMessage>{fieldState.error.message}</ErrorMessage>
          )}
        </div>
      )}
    />
  );
}
