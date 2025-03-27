export interface UsuarioDto {
  id?: number | null;
  isSuperUser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
}
export interface CreateUsuarioDto
  extends Omit<UsuarioDto, 'id' | 'isSuperUser'> {}

export type UpdateUsuarioDto = CreateUsuarioDto;
