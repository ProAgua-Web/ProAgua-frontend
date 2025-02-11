import { format, parse } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { dataHoraMask } from '@/lib/input-mask';
import { ptBR } from 'date-fns/locale';
import { forwardRef, useEffect, useState } from 'react';
import { TextInput } from '../form/input/text-input';
import { TimePickerDemo } from './time-picker-demo';

export interface DateTimePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  onBlur?: () => void;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
}

export const DateTimePicker = forwardRef<HTMLInputElement, DateTimePickerProps>(
  (props, ref) => {
    const [textValue, setTextValue] = useState<string>();

    useEffect(() => {
      if (props.value && !isNaN(props.value.getTime())) {
        setTextValue(format(props.value, 'dd/MM/yyyy HH:mm'));
      }
    }, [props.value]);

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
      if (!e.target.value) {
        props.onChange?.(null);
        return props.onBlur?.();
      }

      const date = parse(
        e.target.value,
        'dd/MM/yyyy HH:mm',
        props.value ?? new Date(),
        { locale: ptBR },
      );

      if (isNaN(date.getTime())) {
        props.onChange?.(null);
        return props.onBlur?.();
      }

      props.onChange?.(date);
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
        <TextInput
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
          onChange={(e) =>
            setTextValue(dataHoraMask.mask(dataHoraMask.unmask(e.target.value)))
          }
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
            onSelect={(d) => {
              const newDate = d ? new Date(d) : null;
              if (newDate && props.value) {
                newDate.setHours(props.value.getHours());
                newDate.setMinutes(props.value.getMinutes());
              }
              props.onChange?.(newDate);
            }}
            initialFocus
            locale={ptBR}
          />
          <div className="border-border border-t p-3">
            <TimePickerDemo date={props.value} setDate={props.onChange} />
          </div>
        </PopoverContent>
      </Popover>
    );
  },
);

DateTimePicker.displayName = 'DateTimePicker';
