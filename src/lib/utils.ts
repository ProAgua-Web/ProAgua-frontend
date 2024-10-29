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
