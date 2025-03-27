'use client';

import { format, parse } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { dataMask } from '@/lib/input-mask';
import { ptBR } from 'date-fns/locale';
import { forwardRef, useEffect, useState } from 'react';
import { MaskedInput } from '../form/input/masked-input';
import { Button } from './button';

export interface DatePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  onBlur?: () => void;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (props, ref) => {
    const [textValue, setTextValue] = useState<string>();

    useEffect(() => {
      if (props.value && !isNaN(props.value.getTime())) {
        setTextValue(format(props.value, 'dd/MM/yyyy'));
      }
    }, [props.value]);

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
      let value = props.value;

      if (!e.target.value) {
        value = null;
      } else {
        value = parse(e.target.value, 'dd/MM/yyyy', props.value ?? new Date(), {
          locale: ptBR,
        });
        if (isNaN(value.getTime())) {
          value = null;
        }
      }

      props.onChange?.(value);
      props.onBlur?.();
    };

    return (
      <Popover
        onOpenChange={(open) => {
          if (!open) {
            props.onBlur?.();
          }
        }}
      >
        <MaskedInput
          className="pl-9"
          placeholder={props.placeholder ?? 'Informe uma data'}
          icon={
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="absolute left-0 top-0 hover:bg-transparent"
                size="icon"
                disabled={props.disabled || props.readOnly}
              >
                <CalendarIcon className="size-4" />
              </Button>
            </PopoverTrigger>
          }
          value={textValue}
          onChange={setTextValue}
          mask={dataMask}
          onBlur={handleBlur}
          disabled={props.disabled}
          readOnly={props.readOnly}
          ref={ref}
        />
        <PopoverContent className="w-auto p-0">
          <Calendar
            captionLayout="dropdown"
            mode="single"
            selected={props.value ?? undefined}
            onSelect={(d) => props.onChange?.(d ?? null)}
            initialFocus
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
    );
  },
);
DatePicker.displayName = 'DatePicker';
