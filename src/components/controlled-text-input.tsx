import {
  Controller,
  type Control,
  type FieldPath,
  type PathValue,
} from 'react-hook-form';
import { ErrorMessage } from './error-message';
import { TextInput, type TextInputProps } from './form/text-input';

interface Props<
  TForm extends Record<string, unknown>,
  TField extends FieldPath<TForm>,
> extends Omit<TextInputProps, 'label'> {
  control: Control<TForm>;
  name: string extends PathValue<TForm, TField> ? TField : never;
  label?: string;
}

export function ControlledTextInput<
  TForm extends Record<string, unknown>,
  TField extends FieldPath<TForm>,
>({ control, name, label, ...inputProps }: Props<TForm, TField>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ...fieldProps }, fieldState }) => (
        <div className="flex flex-col gap-1">
          <TextInput
            value={value as string}
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
