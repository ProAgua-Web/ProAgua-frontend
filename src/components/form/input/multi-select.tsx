import { ErrorMessage } from '@/components/error-message';
import {
  MultiSelect as MultiSelectBase,
  type MultiSelectProps as PropsBase,
  type Value,
} from '@/components/ui/multi-select';
import { forwardRef, type NamedExoticComponent } from 'react';
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
  type PathValue,
} from 'react-hook-form';
import { useFormProps } from '../container';
import { FloatingLabel } from '../floating-label';

interface MultiSelectProps<TValue extends Value> extends PropsBase<TValue> {
  label?: React.ReactNode;
}

interface MultiSelectComp extends NamedExoticComponent {
  <TValue extends Value>(
    props: MultiSelectProps<TValue> & React.RefAttributes<HTMLButtonElement>,
  ): JSX.Element;
}

export const MultiSelect = forwardRef<
  HTMLButtonElement,
  MultiSelectProps<Value>
>(({ label, ...props }, ref) => {
  const formProps = useFormProps();

  return (
    <FloatingLabel
      label={label}
      disabled={props.disabled || formProps?.disabled}
      readOnly={props.readOnly}
    >
      <MultiSelectBase {...props} {...formProps} ref={ref} />
    </FloatingLabel>
  );
}) as MultiSelectComp;
MultiSelect.displayName = 'MultiSelect';

interface ControlledMultiSelectProps<
  TValue extends Value[] & PathValue<TForm, TField>,
  TForm extends FieldValues,
  TField extends FieldPath<TForm>,
> extends Omit<
    MultiSelectProps<TValue[number]>,
    'label' | 'value' | 'onChange'
  > {
  control: Control<TForm>;
  name: TValue extends PathValue<TForm, TField> ? TField : never;
  label: string;
}

export function ControlledMultiSelect<
  TForm extends FieldValues,
  TField extends FieldPath<TForm>,
  TValue extends Value[] & PathValue<TForm, TField>,
>({
  control,
  name,
  label,
  ...props
}: ControlledMultiSelectProps<TValue, TForm, TField>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, ref: _, ...field }, fieldState }) => (
        <div className="flex flex-col gap-1">
          <MultiSelect
            value={value ?? []}
            label={
              <span className={fieldState.error && 'text-red-500'}>
                {label}
              </span>
            }
            {...props}
            {...field}
          />
          {fieldState.error && (
            <ErrorMessage>{fieldState.error.message}</ErrorMessage>
          )}
        </div>
      )}
    />
  );
}
