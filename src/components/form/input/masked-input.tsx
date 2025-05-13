import { ErrorMessage } from '@/components/error-message';
import { Input } from '@/components/ui/input';
import { type InputMask } from '@/lib/input-mask';
import { forwardRef, type ComponentProps, type ReactNode } from 'react';
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
  type PathValue,
} from 'react-hook-form';
import { useFormProps } from '../container';
import { FloatingLabel } from '../floating-label';

interface MaskedInputProps
  extends Omit<ComponentProps<'input'>, 'value' | 'onChange'> {
  mask: InputMask;
  value?: string;
  onChange?: (value: string) => void;
  label?: React.ReactNode;
  icon?: ReactNode;
}

export const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ label, mask, icon, value, onChange, ...props }, ref) => {
    const formProps = useFormProps();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const cursor = e.target.selectionStart;

      const value = e.target.value;
      const newValue = mask.mask(e.target.value);
      e.target.value = newValue;

      /**
       * Reposicionar o cursor após aplicar a máscara
       * Este processo é necessário porque a máscara pode adicionar caracteres e o
       * cursor deve ser reposicionado após a aplicação da máscara
       *
       * Procedimento:
       * 1. Desmascarar o valor até a posição do cursor atual
       * 2. Iterar sobre o valor desmascarado, incrementando o valor do novo cursor
       *   2.1. Se o caractere desmascarado for igual ao caractere mascarado,
       *        incrementar o índice do valor desmascarado
       * 3. Definir a posição do novo cursor
       */
      if (cursor !== null) {
        const unmaskedValue = mask.unmask(value.substring(0, cursor));
        let newCursor = 0;
        for (let i = 0; i < unmaskedValue.length; newCursor++) {
          if (unmaskedValue[i] === newValue[newCursor]) {
            i++;
          }
        }

        e.target.setSelectionRange(newCursor, newCursor);
      }

      onChange?.(mask.unmask(e.target.value));
    }

    return (
      <FloatingLabel
        label={label}
        disabled={props.disabled || formProps?.disabled}
        readOnly={props.readOnly}
      >
        <Input
          value={value ? mask.mask(value) : ''}
          onChange={handleChange}
          {...props}
          {...formProps}
          ref={ref}
        />
        {icon}
      </FloatingLabel>
    );
  },
);
MaskedInput.displayName = 'MaskedInput';

interface ControlledMaskedInputProps<
  TForm extends FieldValues,
  TField extends FieldPath<TForm>,
> extends Omit<MaskedInputProps, 'label' | 'value' | 'onChange'> {
  control: Control<TForm>;
  name: string extends PathValue<TForm, TField> ? TField : never;
  label: string;
}

export const ControlledMaskedInput = <
  TForm extends FieldValues,
  TField extends FieldPath<TForm>,
>({
  control,
  name,
  label,
  ...props
}: ControlledMaskedInputProps<TForm, TField>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1">
          <MaskedInput
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

export const noMask: InputMask = {
  mask: (s) => s ?? '',
  unmask: (s) => s ?? '',
};
