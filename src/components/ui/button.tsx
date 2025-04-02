import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        'default': 'bg-slate-900 text-slate-50 hover:bg-slate-900/90',
        'none': '',
        'destructive': 'bg-red-500 text-slate-50 hover:bg-red-500/90',
        'outline':
          'border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900',
        'primary':
          'rounded-md border bg-primary-500 p-3 text-white hover:bg-primary-600 disabled:bg-primary-400',
        'secondary': 'bg-slate-100 text-slate-900 hover:bg-slate-100/80',
        'add':
          'rounded-md border bg-green-600 text-white hover:bg-green-500 disabled:bg-green-400',
        'delete':
          'rounded-md border bg-red-500 p-3 text-white hover:bg-red-600 disabled:bg-red-400',
        'ghost': 'hover:bg-slate-100 hover:text-slate-900',
        'link': 'text-slate-900 underline-offset-4 hover:underline',
        'header': 'bg-brand-header p-1 text-xl text-white hover:bg-primary-500',
        'new':
          'border border-transparent bg-white text-green-600 hover:border-primary-700 hover:bg-slate-50 hover:text-primary-700',
        'table-access':
          'border border-primary-400 bg-primary-400 text-white hover:border-primary-500 hover:bg-primary-500',
        'table-view':
          'border border-blue-500 bg-blue-100 text-xs text-blue-500 shadow hover:border-blue-700 hover:bg-blue-200 hover:text-blue-800',
        'table-add':
          'border border-green-500 bg-green-100 text-xs text-green-500 shadow hover:border-green-700 hover:bg-green-200 hover:text-green-800',
        'table-edit':
          'border border-slate-300 bg-white text-xs text-slate-700 shadow hover:border-slate-500 hover:bg-slate-100 hover:text-slate-800',
        'table-delete':
          'border border-red-500 bg-red-100 text-xs text-red-500 shadow hover:border-red-700 hover:bg-red-200 hover:text-red-800',
        'destructive-ghost': 'font-bold text-red-500 hover:bg-red-100',
        'ghost-cancel': 'text-red-500 hover:bg-red-100',
        'pagination': 'bg-primary-300/50 text-slate-900 hover:bg-primary-300',
        'input':
          'w-full rounded-md border border-slate-400 bg-white px-3 py-2 font-normal text-slate-900 disabled:cursor-not-allowed',
      },
      size: {
        default: 'h-10 px-4 py-2',
        full: 'h-10 w-full px-4 py-2',
        wide: 'h-10 px-10 py-2',
        xs: 'h-7 px-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        xl: 'h-14 px-10',
        icon: 'size-10',
        nav: 'size-12',
        header: 'size-14',
        badge: 'size-4',
        input: 'min-h-10 px-3 py-2',
        table: 'h-10 px-1.5 py-3',
        none: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  focusVisible?: boolean;
  readOnly?: boolean;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, type = 'button', ...props }, ref) => {
    const Component = asChild ? Slot : 'button';
    return (
      <Component
        type={asChild ? undefined : type}
        className={cn(
          buttonVariants({ variant, size }),
          variant === 'input' && {
            'bg-slate-200': props.disabled && !props.readOnly,
            'cursor-default': props.readOnly,
          },
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
