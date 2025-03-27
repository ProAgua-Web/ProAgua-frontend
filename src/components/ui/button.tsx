import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold text-slate-950 ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        'default':
          'bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90',
        'none': '',
        'destructive':
          'bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90',
        'outline':
          'border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50',
        'primary':
          'rounded-md border bg-primary-500 p-3 text-white hover:bg-primary-600 disabled:bg-primary-400',
        'secondary':
          'bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80',
        'add':
          'rounded-md border bg-green-600 text-white hover:bg-green-500 disabled:bg-green-400',
        'delete':
          'rounded-md border bg-red-500 p-3 text-white hover:bg-red-600 disabled:bg-red-400',
        'ghost':
          'hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50',
        'link':
          'text-slate-900 underline-offset-4 hover:underline dark:text-slate-50',
        'header':
          'bg-brand-header hover:bg-brand-green-500 p-1 text-xl text-white',
        'new':
          'hover:border-brand-green-700 hover:text-brand-green-700 border border-transparent bg-white text-green-600 hover:bg-slate-50',
        'table-access':
          'border-brand-green-400 bg-brand-green-400 hover:border-brand-green-500 hover:bg-brand-green-500 border text-white',
        'table-add':
          'border border-green-500 bg-green-100 text-xs text-green-500 shadow hover:border-green-700 hover:bg-green-200 hover:text-green-800',
        'table-edit':
          'border border-slate-300 bg-white text-xs text-slate-700 shadow hover:border-slate-500 hover:bg-slate-100 hover:text-slate-800',
        'table-delete':
          'border border-red-500 bg-red-100 text-xs text-red-500 shadow hover:border-red-700 hover:bg-red-200 hover:text-red-800',
        'destructive-ghost': 'font-bold text-red-500 hover:bg-red-100',
        'ghost-cancel': 'text-red-500 hover:bg-red-100',
        'pagination':
          'bg-brand-green-300/50 hover:bg-brand-green-300 text-slate-900',
        'input':
          'w-full rounded-md border border-slate-400 bg-white px-3 py-2 font-normal text-slate-900 disabled:cursor-not-allowed',
      },
      size: {
        default: 'h-10 px-4 py-2',
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
  ({ className, variant, size, type = 'button', ...props }, ref) => {
    return (
      <button
        type={type}
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
