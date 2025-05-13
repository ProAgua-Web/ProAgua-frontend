import { Button, buttonVariants } from '@/components/ui/button';
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
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Check, ChevronDown, Search, XCircle, XIcon } from 'lucide-react';
import { forwardRef, useState } from 'react';
import { Spinner } from './spinner';

export type Value = string | number;
export interface Option<TValue extends Value> {
  value: TValue;
  label: string;
}

export interface MultiSelectProps<TValue extends Value> {
  className?: string;
  options: Array<Option<TValue>>;
  value?: TValue[];
  onChange?: (value: TValue[]) => void;
  onBlur?: () => void;
  onSearch: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  isLoading?: boolean;
  maxCount?: number;
}

const DEFAULT_MAX_COUNT = 3;

const DEFAULT_PLACEHOLDER = 'Selecione uma ou mais opções';

export const MultiSelect = forwardRef<
  HTMLButtonElement,
  MultiSelectProps<Value>
>((props, ref) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  function handleSetPopoverOpen(open: boolean) {
    setIsPopoverOpen(open);
    if (!open) {
      props.onBlur?.();
    }
  }

  const length = props.value?.length ?? 0;
  const maxCount = props.maxCount ?? DEFAULT_MAX_COUNT;

  function toggleOption(value: Value) {
    if (props.onChange) {
      const newSelectedValues = props.value?.includes(value)
        ? props.value.filter((v) => v !== value)
        : (props.value ?? []).concat(value);
      props.onChange(newSelectedValues);
    }
  }

  function handleClear() {
    props.onChange?.([]);
  }

  return (
    <Popover open={isPopoverOpen} onOpenChange={handleSetPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          className={props.className}
          variant="input"
          size="input"
          aria-expanded={isPopoverOpen}
          disabled={props.disabled || props.readOnly}
          readOnly={props.readOnly}
          ref={ref}
        >
          {length > 0 ? (
            <div className="flex w-full items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1 overflow-auto">
                {props.value?.slice(0, maxCount).map((value) => {
                  return (
                    <div
                      key={String(value)}
                      className="flex gap-1 rounded-full border border-black py-0.5 pr-1 pl-2 text-xs text-black"
                    >
                      <div>
                        {props.options.find((o) => o.value === value)?.label}
                      </div>
                      <div
                        className={cn(
                          buttonVariants({ variant: 'ghost', size: 'badge' }),
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleOption(value);
                        }}
                      >
                        <XCircle className="size-4" />
                      </div>
                    </div>
                  );
                })}
                {length > maxCount && (
                  <div className="flex gap-1 rounded-full border border-black px-2 py-0.5 text-xs text-black">
                    +{length - maxCount}
                  </div>
                )}
              </div>
              <div className="flex shrink-0 items-center justify-between gap-2">
                <div
                  className={cn(
                    buttonVariants({
                      variant: 'destructive-ghost',
                      size: 'badge',
                    }),
                  )}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleClear();
                  }}
                >
                  <XIcon />
                </div>
                <div className="h-5 w-px bg-slate-300" />
                <ChevronDown className="size-4" />
              </div>
            </div>
          ) : (
            <div className="flex w-full items-center justify-between">
              <div className="overflow-auto">
                <span className="truncate text-sm text-slate-500">
                  {props.placeholder ?? DEFAULT_PLACEHOLDER}
                </span>
              </div>
              <ChevronDown className="size-4" />
            </div>
          )}
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
                  className="cursor-pointer"
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      props.value?.includes(option.value)
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                  <div>{option.label}</div>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <div className="flex items-center justify-between">
                {length > 0 && (
                  <>
                    <CommandItem
                      onSelect={handleClear}
                      className="flex-1 cursor-pointer justify-center"
                    >
                      Limpar
                    </CommandItem>
                    <Separator
                      orientation="vertical"
                      className="flex h-full min-h-6"
                    />
                  </>
                )}
                <CommandItem
                  onSelect={() => handleSetPopoverOpen(false)}
                  className="max-w-full flex-1 cursor-pointer justify-center"
                >
                  Fechar
                </CommandItem>
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
});
MultiSelect.displayName = 'MultiSelect';
