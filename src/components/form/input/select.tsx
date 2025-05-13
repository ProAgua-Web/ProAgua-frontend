import { ErrorMessage } from '@/components/error-message';
import {
  Select as SelectBase,
  type SelectProps as PropsBase,
  type Value,
} from '@/components/ui/select';
import { forwardRef, JSX, type NamedExoticComponent } from 'react';
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
  type PathValue,
} from 'react-hook-form';
import { useFormProps } from '../container';
import { FloatingLabel } from '../floating-label';

interface SelectProps<TValue extends Value> extends PropsBase<TValue> {
  label?: React.ReactNode;
}

interface SelectComp extends NamedExoticComponent {
  <TValue extends Value>(
    props: SelectProps<TValue> & React.RefAttributes<HTMLButtonElement>,
  ): JSX.Element;
}

export const Select = forwardRef<HTMLButtonElement, SelectProps<Value>>(
  ({ label, ...props }, ref) => {
    const formProps = useFormProps();

    return (
      <FloatingLabel
        label={label}
        disabled={props.disabled || formProps?.disabled}
        readOnly={props.readOnly}
      >
        <SelectBase {...(props as PropsBase<Value>)} {...formProps} ref={ref} />
      </FloatingLabel>
    );
  },
) as SelectComp;
Select.displayName = 'Select';

interface ControlledSelectProps<
  TValue extends Value & PathValue<TForm, TField>,
  TForm extends FieldValues,
  TField extends FieldPath<TForm>,
> extends Omit<SelectProps<TValue>, 'label' | 'value'> {
  control: Control<TForm>;
  name: TValue extends PathValue<TForm, TField> ? TField : never;
  label: string;
}

export function ControlledSelect<
  TValue extends Value & PathValue<TForm, TField>,
  TForm extends FieldValues,
  TField extends FieldPath<TForm>,
>({
  control,
  name,
  label,
  ...props
}: ControlledSelectProps<TValue, TForm, TField>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref: _, ...field }, fieldState }) => (
        <div className="flex flex-col gap-1">
          <Select
            label={
              <span className={fieldState.error && 'text-red-500'}>
                {label}
              </span>
            }
            {...props}
            {...field}
            onChange={(value) => {
              field.onChange(value);
              props.onChange?.(value);
            }}
          />
          {fieldState.error && (
            <ErrorMessage>{fieldState.error.message}</ErrorMessage>
          )}
        </div>
      )}
    />
  );
}
