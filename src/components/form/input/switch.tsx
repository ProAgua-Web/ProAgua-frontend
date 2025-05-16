import { ErrorMessage } from '@/components/error-message';
import { Label } from '@/components/ui/label';
import {
  Switch as SwitchBase,
  type SwitchProps as PropsBase,
} from '@/components/ui/switch';
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

interface SwitchProps extends PropsBase {}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
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
        <SwitchBase {...props} {...formProps} ref={ref} />
        {label}
      </Label>
    );
  },
);
Switch.displayName = 'Switch';

interface ControlledSwitchProps<
  TForm extends FieldValues,
  TField extends FieldPath<TForm>,
> extends Omit<SwitchProps, 'checked' | 'onCheckedChange'> {
  control: Control<TForm>;
  name: boolean extends PathValue<TForm, TField> ? TField : never;
  label?: string;
}

export const ControlledSwitch = <
  TForm extends FieldValues,
  TField extends FieldPath<TForm>,
>({
  control,
  name,
  label,
  ...props
}: ControlledSwitchProps<TForm, TField>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              {...props}
            />
            {label && (
              <label
                htmlFor={props.id}
                className={cn(
                  'text-sm font-medium',
                  fieldState.error && 'text-red-500',
                )}
              >
                {label}
              </label>
            )}
          </div>
          {fieldState.error && (
            <ErrorMessage>{fieldState.error.message}</ErrorMessage>
          )}
        </div>
      )}
    />
  );
};

ControlledSwitch.displayName = 'ControlledSwitch';
