import { options } from '@/lib/utils';

export const BooleanOptional = {
  TODOS: 'all',
  TRUE: 'true',
  FALSE: 'false',
} as const;

export type BooleanOptional =
  (typeof BooleanOptional)[keyof typeof BooleanOptional];

export const booleanOptional = Object.values(BooleanOptional);

export const booleanLabel = {
  all: 'Todos',
  true: 'Presença',
  false: 'Ausência',
} as const satisfies Record<BooleanOptional, string>;

export const booleanOptionalOptions = options(booleanOptional, (bool) => [
  bool,
  booleanLabel[bool],
]);
