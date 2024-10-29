import { Input } from '@/components/ui/input';
import { cn, type InputMask } from '@/lib/utils';
import { forwardRef, type ComponentProps, type ReactNode } from 'react';

export interface TextInputProps
  extends Omit<ComponentProps<'input'>, 'value' | 'onChange'> {
  label?: React.ReactNode;
  mask?: InputMask;
  icon?: ReactNode;
  value?: string;
  onChange?: (value: string) => void;
}

function maskValue(input: HTMLInputElement, mask: InputMask) {
  const cursor = input.selectionStart;

  const value = input.value;
  const newValue = mask.mask(input.value);
  input.value = newValue;

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

    input.setSelectionRange(newCursor, newCursor);
  }
}

function handleChange(mask?: InputMask, onChange?: (value: string) => void) {
  return function (e: React.ChangeEvent<HTMLInputElement>) {
    if (!mask) {
      return onChange?.(e.target.value);
    }

    maskValue(e.target, mask);
    onChange?.(mask.unmask(e.target.value));
  };
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, mask, icon, value, onChange, ...inputProps }, ref) => {
    return (
      <div className="relative">
        {label && (
          <label
            className={cn(
              'pointer-events-none z-10 cursor-text whitespace-nowrap rounded-full bg-inherit bg-white px-2 font-semibold leading-none',
              'absolute left-1 top-2 origin-[0] -translate-y-4 scale-75 transform',
              'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100',
              'peer-focus-visible:top-1.5 peer-focus-visible:-translate-y-4 peer-focus-visible:scale-75 peer-focus-visible:px-2',
              'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
            )}
          >
            {label}
          </label>
        )}
        <Input
          value={mask ? mask.mask(value ?? '') : value ?? ''}
          onChange={handleChange(mask, onChange)}
          {...inputProps}
          ref={ref}
        />
        {icon}
      </div>
    );
  },
);
TextInput.displayName = 'TextInput';
