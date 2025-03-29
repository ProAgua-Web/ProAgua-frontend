import { cn } from '@/lib/utils';
import { type ComponentProps } from 'react';

export const Table: React.FC<ComponentProps<'table'>> = ({
  children,
  className,
  ...props
}) => (
  <div className="overflow-x-auto">
    <table
      className={cn('border-b border-gray-300 text-xs', className)}
      {...props}
    >
      {children}
    </table>
  </div>
);

export const Head: React.FC<ComponentProps<'thead'>> = ({
  children,
  className,
  ...props
}) => (
  <thead {...props}>
    <tr className={cn('h-10 bg-gray-100', className)}>{children}</tr>
  </thead>
);

export const Col: React.FC<ComponentProps<'th'>> = ({
  children,
  className,
  ...props
}) => (
  <th className={cn('px-2 font-semibold text-slate-50', className)} {...props}>
    {children}
  </th>
);

export const Body: React.FC<ComponentProps<'tbody'>> = ({
  children,
  className,
  ...props
}) => (
  <tbody className={cn('divide-y divide-gray-300', className)} {...props}>
    {children}
  </tbody>
);

export const Row: React.FC<ComponentProps<'tr'>> = ({
  children,
  className,
  ...props
}) => (
  <tr className={cn('relative h-10 text-right', className)} {...props}>
    {children}
  </tr>
);

export const Cell: React.FC<ComponentProps<'td'>> = ({
  children,
  className,
  ...props
}) => (
  <td
    className={cn('whitespace-nowrap px-2 text-slate-500', className)}
    {...props}
  >
    {children}
  </td>
);

export const T = {
  Table,
  Head,
  Col,
  Body,
  Row,
  Cell,
};
