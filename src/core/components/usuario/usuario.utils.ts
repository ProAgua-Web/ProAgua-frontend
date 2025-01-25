import { options } from '@/lib/utils';

export const NivelUsuario = {
  ADMINISTRADOR: 'ADMINISTRADOR',
  COLABORADOR: 'COLABORADOR',
} as const;

export type NivelUsuario = (typeof NivelUsuario)[keyof typeof NivelUsuario];

export const nivelUsuarioLabel = {
  ADMINISTRADOR: 'Administrador',
  COLABORADOR: 'Colaborador',
} as const satisfies Record<NivelUsuario, string>;

export const nivelUsuarioOptions = options(Object.values(NivelUsuario), (n) => [
  n,
  nivelUsuarioLabel[n],
]);
