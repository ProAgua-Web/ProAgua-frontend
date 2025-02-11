import { cn } from '@/lib/utils';

export const Spinner = (props: { className?: string }) => {
  return (
    <span
      className={cn(
        'mr-4 block h-6 w-6 animate-spin rounded-full border-4 border-blue-400 border-l-white',
        props.className,
      )}
    />
  );
};

Spinner.displayName = 'Spinner';

export default Spinner;
