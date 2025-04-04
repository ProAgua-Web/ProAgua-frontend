'use client';

import { ErrorMessage } from '@/components/error-message';
import { Button } from '@/components/ui/button';
import { type InputProps } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type FileDescription } from '@/core/common/file';
import { cn } from '@/lib/utils';
import { forwardRef, Fragment, useRef } from 'react';
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { HiDocumentPlus, HiXMark } from 'react-icons/hi2';
import { useFormProps } from '../container';

export interface FileInputProps
  extends Omit<InputProps, 'value' | 'onChange' | 'onBlur'> {
  value?: Array<File | FileDescription>;
  onChange?: (value: Array<File | FileDescription>) => void;
  onBlur?: () => void;
  label?: React.ReactNode;
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ label, value = [], onChange, className, ...props }, ref) => {
    const formProps = useFormProps();

    const innerRef = useRef<HTMLInputElement | null>(null);

    return (
      <div className="flex flex-col gap-1">
        <Label
          className={cn('flex items-center gap-1 text-xs text-black', {
            'bg-gradient-to-b from-white to-slate-100 text-opacity-70':
              props.disabled || formProps?.disabled,
            'text-opacity-70': props.readOnly,
          })}
        >
          {label}
        </Label>
        <div
          className={cn(
            'flex min-h-16 w-full min-w-10 items-center justify-between rounded-md border border-dashed border-slate-400 bg-white p-3',
            className,
          )}
        >
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => innerRef?.current?.click()}
            >
              <HiDocumentPlus size={24} className="text-primary-500" />
            </Button>
            <div>
              <p className="text-xs font-medium text-slate-800">
                {value === null || value === undefined || value.length === 0
                  ? 'Nenhum arquivo selecionado'
                  : value.map((file, i) => (
                      <Fragment key={i}>
                        {/* {i !== 0 && ', '} */}
                        {'name' in file ? file.name : file.nome}
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() => {
                            const newValue = value.filter(
                              (_, index) => index !== i,
                            );
                            onChange?.(newValue);
                            props.onBlur?.();
                          }}
                        >
                          <HiXMark size={12} />
                        </Button>
                      </Fragment>
                    ))}
              </p>
              <p className="text-xs text-slate-500">
                O arquivo pode ter até 100 mb
              </p>
            </div>
          </div>
          <Button
            size="sm"
            className="text-xs"
            onClick={() => innerRef?.current?.click()}
          >
            Adicionar arquivos
          </Button>
        </div>
        <input
          type="file"
          className="hidden"
          {...props}
          {...formProps}
          ref={(r) => {
            innerRef.current = r;
            if (typeof ref === 'function') {
              ref(r);
            } else if (ref) {
              ref.current = r;
            }
          }}
          onChange={(e) => {
            const newFiles = e.target.files ? Array.from(e.target.files) : [];
            onChange?.([...value, ...newFiles]);
          }}
        />
      </div>
    );
  },
);
FileInput.displayName = 'FileInput';

interface ControlledFileInputProps<
  TForm extends FieldValues,
  TField extends FieldPath<TForm>,
> extends Omit<FileInputProps, 'label' | 'value' | 'onChange'> {
  control: Control<TForm>;
  name: TField;
  label?: string;
}

export const ControlledFileInput = <
  TForm extends FieldValues,
  TField extends FieldPath<TForm>,
>({
  control,
  name,
  label,
  ...props
}: ControlledFileInputProps<TForm, TField>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1">
          <FileInput
            label={
              <span className={fieldState.error && 'text-red-500'}>
                {label}
              </span>
            }
            {...field}
            {...props}
          />
          {fieldState.error && (
            <ErrorMessage>{fieldState.error.message}</ErrorMessage>
          )}
        </div>
      )}
    />
  );
};
