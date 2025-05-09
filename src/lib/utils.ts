import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface InputMask {
  mask: (texto: string) => string;
  unmask: (texto: string) => string;
}

export const numberMask: InputMask = {
  mask(texto) {
    return texto.replace(/\D/g, '');
  },
  unmask(texto) {
    return texto;
  },
};

export const floatMask: InputMask = {
  mask(texto) {
    return texto.replace(/[^0-9,.]/g, '');
  },
  unmask(texto) {
    return texto;
  },
};

export const stringToFloat = (valor: string | null | undefined) => {
  return parseFloat(valor ?? '') / 100;
};

export const floatToString = (valor: number | null | undefined) => {
  return ((valor ?? 0) * 100).toFixed(0);
};

export type NonEmptyArray<T> = [T, ...T[]];

type Value = string | number | boolean;

export interface Option<TValue extends Value> {
  value: TValue;
  label: string;
}

export function options<T, V extends Value>(
  dados: Array<T> | undefined,
  callback: (item: T) => [value: V, label: string],
): Array<Option<V>> {
  return (
    dados?.map((item) => {
      const [value, label] = callback(item);
      return { value, label };
    }) ?? []
  );
}

export const Campus = {
  LE: 'LE',
  OE: 'OE',
} as const;

export type Campus = (typeof Campus)[keyof typeof Campus];

export const campus = Object.values(Campus);

export const campusLabel = {
  LE: 'Leste',
  OE: 'Oeste',
} as const satisfies Record<Campus, string>;

export const campusOptions = options(campus, (campus) => [
  campus,
  campusLabel[campus],
]);

export function DateISO(d: string): string {
  return new Date(d).toISOString().split('T')[0];
}

const dateOptions = {
  timeZone: 'America/Sao_Paulo',
  minute: 'numeric',
  hour: 'numeric',
  month: 'numeric',
  day: 'numeric',
  year: 'numeric',
} as const;

export function formatDate(dateInput: Date | string | number): string {
  const date = new Date(dateInput);

  if (isNaN(date.getTime())) {
    return 'Data inválida';
  }

  const dateFormatter = new Intl.DateTimeFormat('pt-BR', dateOptions);
  return dateFormatter.format(date);
}
