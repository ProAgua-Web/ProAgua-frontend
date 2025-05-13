'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Label } from './label';

const RadioGroupRoot = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-2', className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroupRoot.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'text-primary aspect-square h-4 w-4 rounded-full border border-slate-400 ring-offset-white focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-3 w-3 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroupItem, RadioGroupRoot };

export type Value = string | number | boolean;
export interface Option<TValue extends Value> {
  value: TValue;
  label: string;
}

export interface RadioGroupProps<TValue extends Value> {
  className?: string;
  options: Array<Option<TValue>>;
  value?: TValue;
  onChange?: (value: TValue) => void;
  onBlur?: () => void;
  disabled?: boolean;
  readOnly?: boolean;
}

export function RadioGroup<TValue extends Value>(
  props: RadioGroupProps<TValue>,
) {
  return (
    <RadioGroupRoot
      className={cn('flex gap-4', props.className)}
      value={String(props.value)}
      onValueChange={(value) => {
        if (props.onChange) {
          const newValue = props.options.find(
            (item) => String(item.value) === value,
          );
          if (newValue !== undefined) {
            props.onChange(newValue.value);
          }
        }
      }}
      disabled={props.disabled || props.readOnly}
    >
      {props.options.map((option) => (
        <Label
          key={String(option.value)}
          className="flex items-center gap-1 text-xs text-slate-600"
        >
          <RadioGroupItem
            value={String(option.value)}
            checked={props.value === option.value}
            onBlur={props.onBlur}
          />
          {option.label}
        </Label>
      ))}
    </RadioGroupRoot>
  );
}
