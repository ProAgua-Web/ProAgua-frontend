'use client';

import { ErrorMessage } from '@/components/error-message';
import { Button } from '@/components/ui/button';
import { type InputProps } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type FileDescription } from '@/core/common/file';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { forwardRef, useRef } from 'react';
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { FaImage } from 'react-icons/fa6';
import { HiXMark } from 'react-icons/hi2';
import { useFormProps } from '../container';

export interface ImageInputProps
  extends Omit<InputProps, 'value' | 'onChange' | 'onBlur'> {
  value?: Array<File | FileDescription>;
  onChange?: (value: Array<File | FileDescription>) => void;
  onBlur?: () => void;
  label?: React.ReactNode;
}

export const ImageInput = forwardRef<HTMLInputElement, ImageInputProps>(
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
            'flex min-h-16 w-full min-w-10 flex-col items-center justify-between rounded-md border border-dashed border-slate-400 bg-white p-3 lg:flex-row',
            className,
          )}
        >
          <div className="flex items-center gap-2">
            <div className="flex flex-wrap gap-1">
              {value === null || value === undefined || value.length === 0 ? (
                <p className="text-xs font-medium text-slate-800">
                  Nenhum arquivo selecionado
                </p>
              ) : (
                value.map((file, i) => (
                  <div key={i} className="relative rounded-lg">
                    <Image
                      width={256}
                      height={256}
                      src={'src' in file ? file.src : URL.createObjectURL(file)}
                      alt={'description' in file ? file.description : file.name}
                      className="h-full w-full rounded-lg border border-slate-300 object-cover lg:max-h-32 lg:max-w-32"
                    />
                    <Button
                      variant="destructive-ghost"
                      size="icon"
                      className={cn(
                        'absolute right-0 top-0 h-fit w-fit p-0.5',
                        'border border-slate-300 bg-white-100/80 transition-all duration-200',
                      )}
                      onClick={() => {
                        const newValue = value.filter(
                          (_, index) => index !== i,
                        );
                        onChange?.(newValue);
                        props.onBlur?.();
                      }}
                    >
                      <HiXMark size={24} className="stroke-1" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
          <Button
            size="fullwide"
            className="text-xs lg:max-w-fit lg:px-4"
            onClick={() => innerRef?.current?.click()}
          >
            <FaImage size={24} className="text-slate-50" />
            Adicionar imagem
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
ImageInput.displayName = 'FileInput';

interface ControlledImageInputProps<
  TForm extends FieldValues,
  TField extends FieldPath<TForm>,
> extends Omit<ImageInputProps, 'label' | 'value' | 'onChange'> {
  control: Control<TForm>;
  name: TField;
  label?: string;
}

export const ControlledImageInput = <
  TForm extends FieldValues,
  TField extends FieldPath<TForm>,
>({
  control,
  name,
  label,
  ...props
}: ControlledImageInputProps<TForm, TField>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1">
          <ImageInput
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
