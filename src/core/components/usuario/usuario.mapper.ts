import { type UsuarioSchema } from './usuario.form';
import { type CreateUsuarioDto, type UsuarioDto } from './usuario.model';

export function usuarioDtoToSchema(usuario: UsuarioDto): UsuarioSchema {
  return {
    first_name: usuario.first_name,
    last_name: usuario.last_name,
    username: usuario.username,
    email: usuario.email,
    password: usuario.password,
  };
}

export function usuarioSchemaToDto(usuario: UsuarioSchema): CreateUsuarioDto {
  return {
    first_name: usuario.first_name,
    last_name: usuario.last_name,
    username: usuario.username,
    email: usuario.email,
    password: usuario.password,
  };
}
