import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, Search } from 'lucide-react';
import { forwardRef, useState } from 'react';
import { Spinner } from './spinner';

export type Value = string | number | boolean;
export interface Option<TValue extends Value> {
  value: TValue;
  label: string;
}

export interface ComboboxProps<TValue extends Value> {
  options: Array<Option<TValue>>;
  value?: TValue;
  onChange?: (value?: TValue) => void;
  onBlur?: () => void;
  onSearch: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  isLoading?: boolean;
  children?: React.ReactNode;
}

const DEFAULT_PLACEHOLDER = 'Selecione uma opção';

export const Combobox = forwardRef<HTMLButtonElement, ComboboxProps<Value>>(
  (props, ref) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    function handleSetPopoverOpen(open: boolean) {
      setIsPopoverOpen(open);
      if (!open) {
        props.onBlur?.();
      }
    }

    function toggleOption(value: Value) {
      if (props.onChange) {
        if (props.value === value) {
          props.onChange(undefined);
        } else {
          props.onChange(value);
        }
      }
      handleSetPopoverOpen(false);
    }

    function handleClear() {
      props.onChange?.(undefined);
      handleSetPopoverOpen(false);
    }

    return (
      <Popover open={isPopoverOpen} onOpenChange={handleSetPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="input"
            size="input"
            role="combobox"
            aria-expanded={isPopoverOpen}
            disabled={props.readOnly || props.disabled}
            readOnly={props.readOnly}
            ref={ref}
          >
            <div className="flex max-h-4 w-full items-center justify-between">
              <div className="overflow-auto overflow-x-auto scrollbar-thin scrollbar-webkit">
                {props.options.find((option) => option.value === props.value)
                  ?.label ?? (
                  <span className="truncate text-sm text-slate-500">
                    {props.placeholder ?? DEFAULT_PLACEHOLDER}
                  </span>
                )}
              </div>
              <ChevronsUpDown className="ml-2 size-4 shrink-0" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          align="start"
          onEscapeKeyDown={() => handleSetPopoverOpen(false)}
        >
          <Command>
            <div
              className="flex items-center border-b px-3"
              cmdk-input-wrapper=""
            >
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <input
                className={cn(
                  'flex h-11 w-full rounded-md bg-transparent py-3 text-sm text-slate-800 outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50',
                )}
                placeholder={props.searchPlaceholder || 'Pesquisar...'}
                value={searchValue}
                onChange={(event) => {
                  setSearchValue(event.target.value);
                  props.onSearch?.(event.target.value);
                }}
              />
            </div>
            <CommandList>
              {props.isLoading ? (
                <CommandEmpty>
                  <div className="flex size-full items-center justify-center">
                    <Spinner />
                  </div>
                </CommandEmpty>
              ) : (
                <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
              )}
              <CommandGroup>
                {props.options.map((option) => (
                  <CommandItem
                    key={String(option.value)}
                    value={String(option.value)}
                    onSelect={() => toggleOption(option.value)}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        props.value === option.value
                          ? 'opacity-100'
                          : 'opacity-0',
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandGroup>
              <div className="flex items-center justify-between">
                <CommandItem
                  onSelect={handleClear}
                  className="flex-1 cursor-pointer justify-center"
                >
                  Limpar
                </CommandItem>
              </div>
            </CommandGroup>
          </Command>
          {props.children}
        </PopoverContent>
      </Popover>
    );
  },
);
Combobox.displayName = 'Combobox';
