import { api, type ApiResponse } from '@/lib/api';
import {
  type CreateUsuarioDto,
  type UpdateUsuarioDto,
  type UsuarioDto,
} from './usuario.model';

export async function listUsuarios() {
  const response = await api.get<ApiResponse<UsuarioDto[]>>('/usuarios');
  return response.data;
}

export async function getUsuario(username: string) {
  const response = await api.get<ApiResponse<UsuarioDto>>(
    `/usuarios/${username}`,
  );
  return response.data;
}

export async function getUsuarioByUsername(username: string) {
  const response = await api.get<ApiResponse<UsuarioDto>>(
    `/usuarios/` + username,
  );
  return response.data;
}

export async function createUsuario(usuario: CreateUsuarioDto) {
  await api.post('/usuarios', usuario);
}

export async function updateUsuario(
  username: string,
  usuario: UpdateUsuarioDto,
) {
  await api.put(`/usuarios/${username}`, usuario);
}

export async function deleteUsuario(username: string) {
  await api.delete(`/usuarios/${username}`);
}
