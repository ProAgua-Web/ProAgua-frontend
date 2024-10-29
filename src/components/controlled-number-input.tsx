import { Controller, type Control, type FieldPath } from 'react-hook-form';
import { ErrorMessage } from './error-message';
import { NumberInput, type NumberInputProps } from './form/number-input';

interface Props<
  TForm extends Record<string, unknown>,
  TField extends FieldPath<TForm>,
> extends Omit<NumberInputProps, 'label'> {
  control: Control<TForm>;
  name: TField;
  label?: string;
}

export function ControlledNumberInput<
  TForm extends Record<string, unknown>,
  TField extends FieldPath<TForm>,
>({ control, name, label, ...inputProps }: Props<TForm, TField>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ...fieldProps }, fieldState }) => (
        <div className="flex flex-col gap-1">
          <NumberInput
            value={value as number}
            onChange={(value) => onChange(value)}
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
