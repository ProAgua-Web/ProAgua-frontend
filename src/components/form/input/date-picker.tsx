import { ErrorMessage } from '@/components/error-message';
import {
  DatePicker as DatePickerBase,
  type DatePickerProps as PropsBase,
} from '@/components/ui/date-picker';
import { forwardRef } from 'react';
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
  type PathValue,
} from 'react-hook-form';
import { useFormProps } from '../container';
import { FloatingLabel } from '../floating-label';

interface DatePickerProps extends PropsBase {
  label?: React.ReactNode;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ label, ...props }, ref) => {
    const formProps = useFormProps();

    return (
      <FloatingLabel
        label={label}
        disabled={props.disabled || formProps?.disabled}
        readOnly={props.readOnly}
      >
        <DatePickerBase {...props} {...formProps} ref={ref} />
      </FloatingLabel>
    );
  },
);
DatePicker.displayName = 'DatePicker';

interface ControlledDatePickerProps<
  TForm extends FieldValues,
  TField extends FieldPath<TForm>,
> extends Omit<DatePickerProps, 'label' | 'value' | 'onChange'> {
  control: Control<TForm>;
  name: Date extends PathValue<TForm, TField> ? TField : never;
  label: string;
}

export function ControlledDatePicker<
  TForm extends FieldValues,
  TField extends FieldPath<TForm>,
>({
  control,
  name,
  label,
  ...props
}: ControlledDatePickerProps<TForm, TField>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1">
          <DatePicker
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
}
