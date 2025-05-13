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

export interface NumberInputProps extends Omit<InputProps, 'value'> {
  value?: number;
  label?: ReactNode;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ label, value = 0, ...props }, ref) => {
    const formProps = useFormProps();

    return (
      <FloatingLabel
        label={label}
        disabled={props.disabled || formProps?.disabled}
        readOnly={props.readOnly}
      >
        <Input
          type="number"
          {...props}
          {...formProps}
          value={String(value)}
          onWheel={(e) => e.currentTarget.blur()}
          ref={ref}
        />
      </FloatingLabel>
    );
  },
);
NumberInput.displayName = 'NumberInput';

interface ControlledNumberInputProps<
  TForm extends FieldValues,
  TField extends FieldPath<TForm>,
> extends NumberInputProps {
  control: Control<TForm>;
  name: number extends PathValue<TForm, TField> ? TField : never;
  label: string;
}

export function ControlledNumberInput<
  TForm extends FieldValues,
  TField extends FieldPath<TForm>,
>({
  control,
  name,
  label,
  ...props
}: ControlledNumberInputProps<TForm, TField>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, ...field }, fieldState }) => (
        <div className="flex flex-col gap-1">
          <NumberInput
            label={
              <span className={fieldState.error && 'text-red-500'}>
                {label}
              </span>
            }
            onChange={(e) => onChange(e.target.valueAsNumber)}
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
