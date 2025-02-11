import { ErrorMessage } from '@/components/error-message';
import {
  Checkbox as CheckboxBase,
  type CheckboxProps as PropsBase,
} from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
  type PathValue,
} from 'react-hook-form';
import { useFormProps } from '../container';

interface CheckboxProps extends PropsBase {}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ label, ...props }, ref) => {
    const formProps = useFormProps();
    return (
      <Label
        className={cn('flex items-center gap-1 text-xs text-black', {
          'bg-gradient-to-b from-white to-slate-100 text-opacity-70':
            props.disabled || formProps?.disabled,
          'text-opacity-70': props.readOnly,
        })}
      >
        <CheckboxBase {...props} {...formProps} ref={ref} />
        {label}
      </Label>
    );
  },
);
Checkbox.displayName = 'Checkbox';

interface ControlledCheckboxProps<
  TForm extends FieldValues,
  TField extends FieldPath<TForm>,
> extends Omit<CheckboxProps, 'checked' | 'onCheckedChange'> {
  control: Control<TForm>;
  name: boolean extends PathValue<TForm, TField> ? TField : never;
  label: string;
}

export function ControlledCheckbox<
  TForm extends FieldValues,
  TField extends FieldPath<TForm>,
>({ control, name, label, ...props }: ControlledCheckboxProps<TForm, TField>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ...field }, fieldState }) => (
        <div className="flex flex-col gap-1">
          <Checkbox
            label={
              <span className={fieldState.error && 'text-red-500'}>
                {label}
              </span>
            }
            checked={value}
            onCheckedChange={onChange}
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
