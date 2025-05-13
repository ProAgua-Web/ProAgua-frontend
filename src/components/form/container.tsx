'use client';

import { cn } from '@/lib/utils';
import {
  createContext,
  forwardRef,
  useContext,
  type FC,
  type FormEventHandler,
  type ReactNode,
} from 'react';
import { type FieldValues, type UseFormReturn } from 'react-hook-form';
import { Button } from '../ui/button';
import Spinner from '../ui/spinner';

interface Props {
  title: string;
  subtitle: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onCancel: () => void;
  isLoading: boolean;
  isSubmitting: boolean;
  children: ReactNode;
  subChildren?: ReactNode;
}

export interface FormProps<TSchema extends FieldValues>
  extends Omit<Props, 'children'> {
  form: UseFormReturn<TSchema>;
}

const FormContext = createContext<Props | undefined>(undefined);

export const useFormProps = () => {
  const formContext = useContext(FormContext);
  if (!formContext?.isLoading) {
    return undefined;
  }

  return {
    disabled: formContext.isLoading,
    placeholder: formContext.isLoading ? 'Carregando...' : undefined,
  };
};

export const FormContainer = forwardRef<HTMLFormElement, Props>(
  (props, ref) => {
    return (
      <FormContext.Provider value={props}>
        <div className="flex w-full flex-col border-y bg-white pb-8 lg:rounded-lg lg:border-x lg:border-slate-100 lg:pt-2 lg:shadow-sm">
          <div className="flex flex-row">
            <div className="flex grow flex-col gap-2 border-b border-slate-100 px-6 py-4 lg:px-14 lg:py-6">
              <h1 className="text-2xl font-semibold text-primary-800">
                {props.title}
              </h1>
              <p className="text-xs text-slate-500">{props.subtitle}</p>
            </div>
            {props.isLoading ? (
              <div className="flex h-full items-center justify-end bg-white bg-opacity-90 px-6 py-4 lg:px-14 lg:py-6">
                <Spinner className="size-12" />
              </div>
            ) : (
              <div className="flex h-full items-center justify-end bg-white bg-opacity-90 px-6 py-4 lg:px-14 lg:py-6">
                {props.subChildren}
              </div>
            )}
          </div>
          <form onSubmit={props.onSubmit} ref={ref}>
            <div className="px-6 py-4 lg:px-14">{props.children}</div>
            <div className="flex flex-col items-end gap-2 border-t border-slate-100">
              <div className="flex w-full flex-col-reverse justify-end gap-2 px-6 pt-8 lg:flex-row lg:px-14">
                <Button
                  variant="destructive-ghost"
                  size="full"
                  onClick={props.onCancel}
                >
                  Cancelar
                </Button>
                <Button size="full" type="submit" disabled={props.isSubmitting}>
                  {props.isSubmitting && <Spinner />}
                  Salvar informações
                </Button>
              </div>
            </div>
          </form>
        </div>
      </FormContext.Provider>
    );
  },
);
FormContainer.displayName = 'FormContainer';

interface SectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export const FormSection: FC<SectionProps> = (props) => {
  return (
    <div className="flex flex-col gap-2 py-2 lg:py-4">
      {props.title && (
        <h2 className="pb-2 font-semibold text-primary-800">{props.title}</h2>
      )}
      <div
        className={cn(
          'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3',
          props.className,
        )}
      >
        {props.children}
      </div>
    </div>
  );
};
