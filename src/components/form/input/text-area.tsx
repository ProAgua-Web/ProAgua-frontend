import { ErrorMessage } from '@/components/error-message';
import {
  Textarea,
  type TextareaProps as PropsBase,
} from '@/components/ui/textarea';
import { forwardRef } from 'react';
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
  type PathValue,
} from 'react-hook-form';
import { useFormProps } from '../container';
import { FloatingLabel } from '../floating-label';

interface TextAreaProps extends PropsBase {
  label?: React.ReactNode;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, ...props }, ref) => {
    const formProps = useFormProps();

    return (
      <FloatingLabel
        label={label}
        disabled={props.disabled || formProps?.disabled}
        readOnly={props.readOnly}
      >
        <Textarea {...props} {...formProps} ref={ref} />
      </FloatingLabel>
    );
  },
);
TextArea.displayName = 'TextArea';

interface ControlledTextAreaProps<
  TForm extends FieldValues,
  TField extends FieldPath<TForm>,
> extends TextAreaProps {
  control: Control<TForm>;
  name: string extends PathValue<TForm, TField> ? TField : never;
  label: string;
}

export function ControlledTextArea<
  TForm extends FieldValues,
  TField extends FieldPath<TForm>,
>({ control, name, label, ...props }: ControlledTextAreaProps<TForm, TField>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1">
          <TextArea
            label={
              <span className={fieldState.error && 'text-red-500'}>
                {label}
              </span>
            }
            {...props}
            {...field}
          />
          {fieldState.error && (
            <ErrorMessage>{fieldState.error.message}</ErrorMessage>
          )}
        </div>
      )}
    />
  );
}
