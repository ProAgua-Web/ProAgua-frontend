import { EditarUsuarioSchema, type CriarUsuarioSchema } from './usuario.form';
import { UpdateUsuarioDto, type CreateUsuarioDto } from './usuario.model';

// export function usuarioDtoToSchema(dto: UsuarioDto): CriarUsuarioSchema {
//   return {
//     first_name: dto.first_name,
//     last_name: dto.last_name,
//     username: dto.username,
//     email: dto.email,
//     password: dto.password,
//     is_superuser: dto.is_superuser,
//   };
// }

export function createUsuarioSchemaToDto(
  schema: CriarUsuarioSchema,
): CreateUsuarioDto {
  return {
    first_name: schema.first_name,
    last_name: schema.last_name,
    username: schema.username,
    email: schema.email,
    password: schema.password,
    is_superuser: schema.is_superuser,
  };
}

export function updateUsuarioSchemaToDto(
  schema: EditarUsuarioSchema,
): UpdateUsuarioDto {
  return {
    first_name: schema.first_name,
    last_name: schema.last_name,
    username: schema.username,
    email: schema.email,
    is_superuser: schema.is_superuser,
  };
}
