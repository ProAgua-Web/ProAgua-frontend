import {
  Select as SelectBase,
  type SelectProps as PropsBase,
  type Value,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export type SelectValue = Value;

export interface SelectProps<TData, TValue extends SelectValue>
  extends PropsBase<TData, TValue> {
  readOnly?: boolean;
  label?: React.ReactNode;
}

export function Select<TData, TValue extends SelectValue>({
  label,
  readOnly,
  disabled,
  ...props
}: SelectProps<TData, TValue>) {
  return (
    <div className="relative">
      {label && (
        <label
          className={cn(
            'pointer-events-none z-10 cursor-text whitespace-nowrap rounded-full bg-white px-2 font-semibold leading-none',
            'absolute left-1 top-2 origin-[0] -translate-y-4 scale-75 transform',
            'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100',
            'peer-focus-visible:top-1.5 peer-focus-visible:-translate-y-4 peer-focus-visible:scale-75 peer-focus-visible:px-2',
            'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
            {
              'cursor-default opacity-50': readOnly,
              'cursor-not-allowed': disabled,
            },
          )}
        >
          {label}
        </label>
      )}
      <SelectBase<TData, TValue>
        className="border border-slate-200 shadow-sm sm:text-sm"
        disabled={readOnly || disabled}
        {...props}
      />
    </div>
  );
}
