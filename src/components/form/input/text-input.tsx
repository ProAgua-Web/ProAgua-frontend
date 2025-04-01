import { ErrorMessage } from '@/components/error-message';
import { Input, type InputProps } from '@/components/ui/input';
import { forwardRef, type ReactNode } from 'react';
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
  type PathValue,
} from 'react-hook-form';
import { useFormProps } from '../container';
import { FloatingLabel } from '../floating-label';

export interface TextInputProps extends Omit<InputProps, 'value'> {
  value?: string;
  label?: React.ReactNode;
  icon?: ReactNode;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, icon, value = '', ...props }, ref) => {
    const formProps = useFormProps();

    return (
      <FloatingLabel
        label={label}
        disabled={props.disabled || formProps?.disabled}
        readOnly={props.readOnly}
      >
        <Input {...props} {...formProps} value={value} ref={ref} />
        {icon}
      </FloatingLabel>
    );
  },
);
TextInput.displayName = 'TextInput';

interface ControlledTextInputProps<
  TForm extends FieldValues,
  TField extends FieldPath<TForm>,
> extends Omit<TextInputProps, 'label' | 'value' | 'onChange'> {
  control: Control<TForm>;
  name: string extends PathValue<TForm, TField> ? TField : never;
  label: string;
}

export const ControlledTextInput = <
  TForm extends FieldValues,
  TField extends FieldPath<TForm>,
>({
  control,
  name,
  label,
  ...props
}: ControlledTextInputProps<TForm, TField>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1">
          <TextInput
            label={
              <span className={fieldState.error && 'text-red-500'}>
                {label}
              </span>
            }
            {...field}
            {...props}
          />
          {fieldState.error && (
            <ErrorMessage>{fieldState.error.message}</ErrorMessage>
          )}
        </div>
      )}
    />
  );
};

type ControlledAuthTextInputProps<
  TForm extends FieldValues,
  TField extends FieldPath<TForm>,
> = TextInputProps & {
  control: Control<TForm>;
  name: string extends PathValue<TForm, TField> ? TField : never;
  label: string;
  mask?: (value: string) => string;
};

export function ControlledAuthTextInput<
  TForm extends FieldValues,
  TField extends FieldPath<TForm>,
>({
  control,
  name,
  label,
  mask,
  ...props
}: ControlledAuthTextInputProps<TForm, TField>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, ...field }, fieldState }) => (
        <div className="flex flex-col gap-1">
          {label && (
            <label htmlFor={name} className="text-sm font-bold text-slate-500">
              {label}
            </label>
          )}
          <TextInput
            id={name}
            onChange={(e) => {
              onChange(mask ? mask(e.target.value) : e.target.value);
            }}
            {...field}
            {...props}
          />
          {fieldState.error && (
            <ErrorMessage>{fieldState.error.message}</ErrorMessage>
          )}
        </div>
      )}
    />
  );
}
