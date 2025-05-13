import { ErrorMessage } from '@/components/error-message';
import {
  RadioGroup as RadioGroupBase,
  type RadioGroupProps as PropsBase,
  type Value,
} from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
  type PathValue,
} from 'react-hook-form';
import { useFormProps } from '../container';

interface RadioGroupProps<TValue extends Value> extends PropsBase<TValue> {
  label?: React.ReactNode;
}

export const RadioGroup = <TValue extends Value>({
  label,
  ...props
}: RadioGroupProps<TValue>) => {
  const formProps = useFormProps();

  return (
    <div className="relative">
      {label && (
        <label
          className={cn(
            'inline-block origin-left scale-75 whitespace-nowrap rounded-full bg-inherit bg-white pb-2 text-sm font-semibold leading-none',
            {
              'cursor-not-allowed opacity-50': props.readOnly,
              'cursor-not-allowed opacity-70': props.disabled,
            },
          )}
        >
          {label}
        </label>
      )}
      <RadioGroupBase {...props} {...formProps} />
    </div>
  );
};

interface ControlledRadioGroupProps<
  TValue extends Value & PathValue<TForm, TField>,
  TForm extends FieldValues,
  TField extends FieldPath<TForm>,
> extends Omit<RadioGroupProps<TValue>, 'label' | 'value' | 'onChange'> {
  control: Control<TForm>;
  name: TValue extends PathValue<TForm, TField> ? TField : never;
  label: string;
}

export function ControlledRadioGroup<
  TValue extends Value & PathValue<TForm, TField>,
  TForm extends FieldValues,
  TField extends FieldPath<TForm>,
>({
  control,
  name,
  label,
  ...props
}: ControlledRadioGroupProps<TValue, TForm, TField>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref: _, ...field }, fieldState }) => (
        <div className="flex flex-col gap-1">
          <RadioGroup
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
