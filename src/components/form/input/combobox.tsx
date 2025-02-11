import { ErrorMessage } from '@/components/error-message';
import {
  Combobox as ComboboxBase,
  type ComboboxProps as PropsBase,
  type Value,
} from '@/components/ui/combobox';
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

interface ComboboxProps<TValue extends Value> extends PropsBase<TValue> {
  label?: React.ReactNode;
}

interface ComboboxComp extends NamedExoticComponent {
  <TValue extends Value>(
    props: ComboboxProps<TValue> & React.RefAttributes<HTMLButtonElement>,
  ): JSX.Element;
}

export const Combobox = forwardRef<HTMLButtonElement, ComboboxProps<Value>>(
  ({ label, ...props }, ref) => {
    const formProps = useFormProps();

    return (
      <FloatingLabel
        label={label}
        disabled={props.disabled || formProps?.disabled}
        readOnly={props.readOnly}
      >
        <ComboboxBase {...props} {...formProps} ref={ref} />
      </FloatingLabel>
    );
  },
) as ComboboxComp;
Combobox.displayName = 'Combobox';

interface ControlledComboboxProps<
  TValue extends Value & PathValue<TForm, TField>,
  TForm extends FieldValues,
  TField extends FieldPath<TForm>,
> extends Omit<ComboboxProps<TValue>, 'label' | 'value' | 'onChange'> {
  control: Control<TForm>;
  name: TValue extends PathValue<TForm, TField> ? TField : never;
  label: string;
}

export function ControlledCombobox<
  TValue extends Value & PathValue<TForm, TField>,
  TForm extends FieldValues,
  TField extends FieldPath<TForm>,
>({
  control,
  name,
  label,
  ...props
}: ControlledComboboxProps<TValue, TForm, TField>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref: _, ...field }, fieldState }) => (
        <div className="flex flex-col gap-1">
          <Combobox
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
