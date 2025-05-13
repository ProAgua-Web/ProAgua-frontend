import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  label?: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
}

export const FloatingLabel: React.FC<Props> = (props) => {
  return (
    <div className="relative">
      {props.label && (
        <label
          className={cn(
            'pointer-events-none z-10 cursor-text whitespace-nowrap rounded-sm bg-inherit bg-white px-2 text-sm font-semibold leading-none text-black',
            'absolute left-1.5 top-2 origin-[0] -translate-y-4 scale-75 transform',
            {
              'bg-gradient-to-b from-white to-slate-100 text-opacity-70':
                props.disabled,
              'text-opacity-70': props.readOnly,
            },
            props.className,
          )}
        >
          {props.label}
        </label>
      )}
      {props.children}
    </div>
  );
};
