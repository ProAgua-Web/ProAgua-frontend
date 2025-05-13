import { ErrorMessage } from '@/components/error-message';
import {
  DateTimePicker as DateTimePickerBase,
  type DateTimePickerProps as PropsBase,
} from '@/components/ui/date-time-picker';
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

interface DateTimePickerProps extends PropsBase {
  label?: React.ReactNode;
}

export const DateTimePicker = forwardRef<HTMLInputElement, DateTimePickerProps>(
  ({ label, ...props }, ref) => {
    const formProps = useFormProps();

    return (
      <FloatingLabel
        label={label}
        disabled={props.disabled || formProps?.disabled}
        readOnly={props.readOnly}
      >
        <DateTimePickerBase {...props} {...formProps} ref={ref} />
      </FloatingLabel>
    );
  },
);
DateTimePicker.displayName = 'DateTimePicker';

interface ControlledDateTimePickerProps<
  TForm extends FieldValues,
  TField extends FieldPath<TForm>,
> extends Omit<DateTimePickerProps, 'label' | 'value' | 'onChange'> {
  control: Control<TForm>;
  name: Date extends PathValue<TForm, TField> ? TField : never;
  label: string;
}

export function ControlledDateTimePicker<
  TForm extends FieldValues,
  TField extends FieldPath<TForm>,
>({
  control,
  name,
  label,
  ...props
}: ControlledDateTimePickerProps<TForm, TField>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1">
          <DateTimePicker
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
