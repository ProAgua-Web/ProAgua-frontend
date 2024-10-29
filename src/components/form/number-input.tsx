import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ComponentProps, forwardRef, ReactNode } from 'react';

export interface NumberInputProps
  extends Omit<ComponentProps<'input'>, 'value' | 'onChange'> {
  label?: React.ReactNode;
  icon?: ReactNode;
  value?: number;
  onChange?: (value: number) => void;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ label, icon, value, onChange, ...inputProps }, ref) => {
    return (
      <div className="relative">
        {label && (
          <label
            className={cn(
              'pointer-events-none z-10 cursor-text whitespace-nowrap rounded-full bg-inherit bg-white px-2 font-semibold leading-none',
              'absolute left-1 top-2 origin-[0] -translate-y-4 scale-75 transform',
              'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100',
              'peer-focus-visible:top-1.5 peer-focus-visible:-translate-y-4 peer-focus-visible:scale-75 peer-focus-visible:px-2',
              'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
            )}
          >
            {label}
          </label>
        )}
        <Input
          {...inputProps}
          type="number"
          ref={ref}
          value={value}
          onChange={(e) => onChange?.(Number(e.target.value))}
        />
        {icon}
      </div>
    );
  },
);
NumberInput.displayName = 'NumberInput';
