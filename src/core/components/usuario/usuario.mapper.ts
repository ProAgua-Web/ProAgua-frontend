import { type CreateUsuarioDTO } from './usuario.api';
import { type UsuarioSchema } from './usuario.form';
import { type Usuario } from './usuario.model';

export function usuarioToSchema({
  unidades,
  ...usuario
}: Usuario): UsuarioSchema {
  return {
    ...usuario,
    unidades: unidades.map(({ id }) => id),
  };
}

export function usuarioSchemaToDto(usuario: UsuarioSchema): CreateUsuarioDTO {
  return {
    ...usuario,
    unidades: usuario.unidades.map((id) => id),
  };
}
