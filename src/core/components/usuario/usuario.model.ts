export interface UsuarioDto {
  id?: number | null;
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
}
export interface CreateUsuarioDto extends Omit<UsuarioDto, 'id'> {}

export interface UpdateUsuarioDto extends Omit<CreateUsuarioDto, 'password'> {}
