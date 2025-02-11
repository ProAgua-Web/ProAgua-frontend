import { ErrorMessage } from '@/components/error-message';
import { Input, type InputProps } from '@/components/ui/input';
import { forwardRef, useState, type ReactNode } from 'react';
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
  type PathValue,
} from 'react-hook-form';
import { useFormProps } from '../container';
import { FloatingLabel } from '../floating-label';

export interface ImageInputProps extends Omit<InputProps, 'value'> {
  value?: File;
  label?: React.ReactNode;
  icon?: ReactNode;
}

export const ImageInput = forwardRef<HTMLInputElement, ImageInputProps>(
  ({ label, icon, ...props }, ref) => {
    const formProps = useFormProps();
    // const [file, setFile] = useState<File | null>(null);
    const [fileContent, setFileContent] = useState<string | null>(null);

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0] || null;
      // setFile(selectedFile);
      // (await selectedFile?.text()) ?? null;
      if (props.onChange) {
        props.onChange(event);
      }
    };

    return (
      <FloatingLabel
        label={label}
        disabled={props.disabled || formProps?.disabled}
        readOnly={props.readOnly}
      >
        <Input
          // {...props}
          {...formProps}
          type="file"
          ref={ref}
          onChange={handleChange}
          // value={fileContent ?? undefined}
        />
      </FloatingLabel>
    );
  },
);
ImageInput.displayName = 'ImageInput';

interface ControlledImageInputProps<
  TForm extends FieldValues,
  TField extends FieldPath<TForm>,
> extends Omit<ImageInputProps, 'label' | 'value' | 'onChange'> {
  control: Control<TForm>;
  name: string extends PathValue<TForm, TField> ? TField : never;
  label: string;
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
            onChange={async (event) => {
              const selectedFile = event.target?.files?.[0];
              const fileContent = await selectedFile?.text();
              field.onChange(fileContent);
            }}
          />
          {fieldState.error && (
            <ErrorMessage>{fieldState.error.message}</ErrorMessage>
          )}
        </div>
      )}
    />
  );
};
