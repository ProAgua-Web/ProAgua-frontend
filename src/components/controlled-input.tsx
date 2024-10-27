import { ErrorMessage } from '@/components/error-message';
import { Input } from '@/components/ui/input';
import { type ComponentProps, type ReactNode } from 'react';
import { Controller, type Control, type Path } from 'react-hook-form';

type ControlSubset<TRecord, TType> = {
  [TKey in keyof TRecord as TRecord[TKey] extends TType
    ? TKey
    : never]: TRecord[TKey];
};

type Props<TForm extends Record<string, unknown>> = ComponentProps<'input'> & {
  control: Control<TForm>;
  name: Path<ControlSubset<TForm, string>>;
  label?: string;
  mask?: (value: string) => string;
  icon?: ReactNode;
};

export function ControlledInput<TForm extends Record<string, unknown>>({
  control,
  name,
  label,
  mask,
  icon,
  ...inputProps
}: Props<TForm>) {
  return (
    <Controller
      control={control}
      name={name as Path<TForm>}
      render={({ field: { onChange, value, ...fieldProps }, fieldState }) => (
        <div className="flex flex-col gap-1">
          {label && (
            <label htmlFor={name} className="text-sm font-bold text-slate-500">
              {label}
            </label>
          )}
          <div className="relative">
            <Input
              id={name}
              value={value as string}
              onChange={
                mask
                  ? (e) => onChange(mask(e.target.value))
                  : (e) => onChange(e.target.value)
              }
              {...inputProps}
              {...fieldProps}
            />
            {icon}
          </div>
          {fieldState.error && (
            <ErrorMessage>{fieldState.error.message}</ErrorMessage>
          )}
        </div>
      )}
    />
  );
}
