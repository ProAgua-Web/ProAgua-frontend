import {
  type CriarUsuarioSchema,
  type EditarUsuarioSchema,
} from './usuario.form';

export function usuarioDtoToSchema(
  dto: CriarUsuarioSchema | EditarUsuarioSchema,
): CriarUsuarioSchema | EditarUsuarioSchema {
  if ('password' in dto) {
    return {
      first_name: dto.first_name,
      last_name: dto.last_name,
      username: dto.username,
      email: dto.email,
      password: dto.password,
      is_superuser: dto.is_superuser,
    };
  }
  return {
    first_name: dto.first_name,
    last_name: dto.last_name,
    username: dto.username,
    email: dto.email,
    is_superuser: dto.is_superuser,
  };
}

export function usuarioSchemaToDto(
  schema: CriarUsuarioSchema | EditarUsuarioSchema,
): CriarUsuarioSchema | EditarUsuarioSchema {
  if ('password' in schema) {
    return {
      first_name: schema.first_name,
      last_name: schema.last_name,
      username: schema.username,
      email: schema.email,
      password: schema.password,
      is_superuser: schema.is_superuser,
    };
  }
  return {
    first_name: schema.first_name,
    last_name: schema.last_name,
    username: schema.username,
    email: schema.email,
    is_superuser: schema.is_superuser,
  };
}
